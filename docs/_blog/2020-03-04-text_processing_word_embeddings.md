# Word Embeddings

## What are Word Embeddings?

Word Embeddings are a method to translate a string of text into an N-dimensional vector of real numbers.  Many computational methods are not capable of accepting text as input.  This is one method of transforming text into a number space that can be used in various computational methods.

## An Example

| Word  | "Royalty" Feature | "Masculinity" Feature |
| ----- | ----------------- | --------------------- |
| Queen | 0.958123          | 0.03591294            |
| King  | 0.94981289        | 0.92959219            |
| Man   | 0.051231          | 0.9592109321          |
| Woman | 0.0912987         | 0.04912983189         |

Let's say we were to create embeddings for the four words above, with two features representing Royalty and Masculinity.  The resulting embedding for the word "Queen" is <0.958123, 0.03591294> - a value close to 1 for Royalty, and a value close to 0 for Masculinity.  In this example, we could identify the concept of Masculinity by the vector <0,1> and Royalty by <1,0>.

| Word  | Feature 1 | Feature 2 | Feature 3 | Feature 4 |
| ----- | --------- | --------- | --------- | --------- |
| Queen | 0.854712  | 0.32145   | 0.123512  | 0.023051  |
| King  | 0.9521    | 0.23151   | 0.721385  | 0.950213  |
| Man   | 0.12351   | 0.067231  | 0.85921   | 0.821231  |
| Woman | 0.23131   | 0.123151  | 0.011249  | 0.23151   |

However, in real world examples, it is rarely this simple.  In general, we do not know exactly what each of the N features mean.  It is very common to test the quality of embeddings using analogies.  For example, even thought we may not be able to identify a feature for Royalty, we expect that subtracting the vectors "King - Man" and "Queen - Woman" should give us roughly the same vector representing Royalty.  Similarily for Masculinity, we can test the similarity of the vectors "Man - Woman" and "King - Queen".  

## Common Embedding Models

### Stanford NLP GloVe

Stanford NLP publishes a set of word embeddings called Global Vectors for Word Representation (GloVe).  These embeddings are trained as a decomposition of the word co-occurance matrix of a corpus of text.  Pre-trained embeddings are also available, ranging in N-dimensional size, as well as what corpus they were trained on (Wikipedia, Common Crawl, Twitter). You can find GloVe and more information [here](https://nlp.stanford.edu/projects/glove/)

### Word2Vec

Word2Vec is a collection of algorithms developed by Google to generate word embeddings based on word context.  Both algorithms utilize a neural network to optimize the embeddings.  The first model type is called a Continuous Bag of Words (CBOW), and predicts a word given the words surrounding it.  The second model type is called Skip-Gram, and does the opposite; given a word, predict the words surrounding it.  [You can read more on Word2Vec's wikipedia page.](https://en.wikipedia.org/wiki/Word2vec) [The Gensim package in python has an implementation of these algorithms](https://radimrehurek.com/gensim/models/word2vec.html)

## Common Embedding Uses

### Regression and Classification

If you are looking to classify text, word embeddings provide an easy way to translate your text into an input that is ingestible by any machine learning model.  The same goes if you're looking to predict a real number based on text - word embeddings could be the avenue you take to transform a company's SEC filing to predict their stock volatility.

### Document Clustering	

Word embeddings can be aggregated up to a document level.  Creating these document embeddings is one method to cluster similar documents together based on their word usage.
