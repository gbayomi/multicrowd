import csv
from collections import defaultdict as dd
import re
from os import listdir
import random
import os.path
import time
import numpy as np
import gensim
from gensim.models import KeyedVectors as kv
from scipy.io import arff
from cStringIO import StringIO
import unicodedata
from googletrans import Translator

def translate_german(a):
	translations = translator.translate(a, src='de', dest='en')
	res = []
	for translation in translations:
		res.append(translation.text)

	return res

def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')

def get_filenames(path_to_dir, types, suffix=".csv"):
    filenames = listdir(path_to_dir)
    files = [f for f in filenames if f.endswith(suffix)]

    d = {}
    for t in types:
    	d[t] = validate_for_type_files(files, [t])

    return d

def validate_for_type_files(filenames, _types):
	a = []
	for name in filenames:
		for t in _types:
			if t in name.lower():
				a.append(name)
	return a

def save_features_file_csv(features, output_csv):
	with open(output_csv, "wb") as f:
	   writer = csv.writer(f)
	   writer.writerows(features)


def create_vec_translation_file(filename, folder_input, folder_output, model, num_features):
	input_path = folder_input + filename
	intervals, sentences_vec = read_format_file(input_path, model, num_features)


	features = []
	line = 1
	for interv,vec in zip(intervals,sentences_vec):
		feature = [filename] + vec
		features.append(feature)

	output_path = folder_output + filename
	save_features_file_csv(features, output_path)

def read_format_file(filename, model, num_features):
	intervals = []
	sentences_vec = []
	with open(filename, 'rb') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
		for row in spamreader:
			times = row[0].split(',')
			start, end = times[0], times[1]
			intervals.append((start, end))
			sentence = ' '.join(times[2:]) + ' ' + ' '.join(row[1:])
			sentence = ' '.join(sentence.strip().lower().split())
			sentence = ' '.join([filter(str.isalnum, w) for w in sentence.split()])
			if sentence == 'slightlaughter':
				sentence = 'slight laughter'
			vec = makeFeatureVec(sentence, model, num_features)
			sentences_vec.append(vec)

	return intervals, sentences_vec

def sentences_to_matrix(model, sentences, num_features):
	size = len(sentences)
	matrix = []

	for i in range(0, size):
		sentence = sentences[i]
		sent_to_vec = makeFeatureVec(sentence, model, num_features)
		matrix.append(sent_to_vec)

	return matrix

def makeFeatureVec(words, model, num_features):
	words = words.split()
	featureVec = np.zeros((num_features,),dtype="float32")
	nwords = 0.
	index2word_set = set(model.index2word)

	for word in words:
		if word in index2word_set:
			nwords = nwords + 1.
			featureVec = np.add(featureVec,model[word])
		elif (word[0].upper()+word[1:]) in index2word_set:
			nwords = nwords + 1.
			featureVec = np.add(featureVec,model[(word[0].upper()+word[1:])])

	if nwords>0:
		featureVec = np.divide(featureVec,nwords)
	return [str(a) for a in featureVec]

def makeFeatureVecFAKE(words, model, num_features):
	featureVec = np.zeros((num_features,),dtype="float32")
	return [str(a) for a in featureVec]



folder_input = 'translated/'
folder_output = 'translated_vec/'
types = ['train', 'dev']
model = kv.load_word2vec_format('./model/GoogleNews-vectors-negative300.bin', binary=True)
num_features = 300
package = get_filenames(folder_input, types)

for _type,filenames in package.iteritems():
		for filename in filenames:
			print filename
			create_vec_translation_file(filename, folder_input, folder_output, model, num_features)