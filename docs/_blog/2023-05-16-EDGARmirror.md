# SEC Filings
<div class="last-updated">Last updated: 2023-05-16</div>

All companies are required to file registration statements, periodic reports, and other forms to the SEC and these filings are popular sources of data for researchers at the GSB. This topic guide covers some of the resources available to facilitate research using these filings and a few sample workflows.

{% include note.html content="We gave a presentation on \"Using SEC Documents at the GSB\" on November 16, 2022. Watch the recording and view the slides [here](https://libguides.stanford.edu/hub-recordings#s-lg-box-29618224)." %}

## EDGAR

The SEC maintains a comprehensive collection of filings on their <a href="https://www.sec.gov/edgar/search-and-access" target="_blank">EDGAR system</a> and you can search for filings by company name, ticker, and CIK <a href="https://www.sec.gov/edgar/searchedgar/companysearch.html" target="_blank">here</a>.

While viewing individual filings on EDGAR is useful, for those who need bulk access to filings, there are a couple of primary resources.

### Yens Collection
The DARC team maintains a mirror of the raw text filings on the Yens by checking for new filings on the EDGAR system on a weekly basis and then downloading those filings. An example path for an individual filing located on the Yens is:

```
/zfs/data/NODR/EDGAR_HTTPS/edgar/data/1050122/0001047469-03-017249.txt
```

For clarity, the <span style="color: red;"><b>middle portion</b></span> of this path can be used to find the same filing on EDGAR:

- /zfs/data/NODR/EDGAR_HTTPS/ + <span style="color: red;"><b>edgar/data/1050122/0001047469-03-017249</b></span> + .txt

- https://www.sec.gov/Archives/ + <span style="color: red;"><b>edgar/data/1050122/0001047469-03-017249</b></span> + -index.htm

The above provides a clear way to identify specific documents, but not a way to "query" those documents. To address this, the DARC team also maintains a <a href="https://redivis.com/datasets/dq12-4q4st0kjt" target="_blank">SQL dataset on Redivis</a> that can be queried for specific filings.

This dataset contains a table, `edgar-filings`, with the following fields:
```
cik
company_name
form_type
date_filed
filename
year
quarter
filepath
```

For example, to produce a list of a few 10-K filings from 1994, you can run the following query via Redivis:
```
SELECT * FROM `edgar_filings` WHERE form_type='10-K' and year=1994 LIMIT 10
```

You may then use the `filepath` field to locate these filings on the Yens or `filename` to construct the appropriate URLs to those filings on EDGAR.

You can also explore the EDGAR Filings data set on Redivis. An example project is found <a href="https://redivis.com/projects/ssxg-10madynje" target="_blank">here</a>.
You can create a copy to modify or run the transforms yourself by "Forking" the project. There are three example transforms:
one to filter earliest 100 8-K filings; second one to filter all 8-K, 10-K and 10-Q filings; and a third one to only filter a year
worth of filings using the output of the second transform as the input table.

For your convenience, we have also crafted a Python-based example project to illustrate how one might parse EDGAR filings on the Yens. In this example (an actual use case we encountered), we attempt to seek out sentences that contain a specific word, that also have adjacent sentences containin key target phrases. Please refer to the `edgar_filings_example_notebook.ipynb` notebook in the following directory for more information on how to explore this project:

```
/zfs/data/NODR/EDGAR_HTTPS/example_project/
```

### WRDS Collection
If you have a <a href="https://wrds-www.wharton.upenn.edu/" target="_blank">WRDS</a> account (you can request one <a href="https://stanford.idm.oclc.org/login?url=https://wrds-www.wharton.upenn.edu/register" target="_blank">here</a>), you can also access EDGAR filings from their server. Have a look at <a href="https://wrds-www.wharton.upenn.edu/documents/1439/WRDS_SEC_Suite_PowerPoint_for_Video_Learning.pdf" target="_blank">this link</a> for additional information about the WRDS collection of filings.

To access these filings, you can connect to <a href="https://wrds-www.wharton.upenn.edu/pages/support/the-wrds-cloud/introduction-wrds-cloud/" target="_blank">WRDS Cloud</a> and either navigate to `/wrds/sec/warchives/` for raw filings or `/wrds/sec/wrds_clean_filings/` for cleaned filings.

{% include note.html content="The DARC team does not provide support for issues with WRDS. Please submit a ticket to [WRDS Support](https://wrds-www.wharton.upenn.edu/contact-support) instead." %}

## XBRL
In an effort to standardize data submitted by companies to the SEC, the SEC commission <a href="https://www.sec.gov/structureddata/osd-inline-xbrl.html" target="_blank">adopted amendments in 2018 requiring the use</a> of the Inline XBRL (eXtensible Business Reporting Language) format in submissions of financial statement information. As a result, many recent forms on EDGAR (see <a href="https://www.sec.gov/info/edgar/edgartaxonomies.shtml" target="_blank">here</a> for a list of form types with XBRL) can be viewed with XBRL elements highlighted (<a href="https://www.sec.gov/ix?doc=/Archives/edgar/data/0000732717/000156276220000064/t-20191231.htm" target="_blank">example Form 10-K</a> from AT&T in 2020).

Besides viewing this XBRL data in an interactive format on EDGAR, users have a few ways of accessing bulk XBRL data.

### APIs
Both the <a href="https://www.sec.gov/edgar/sec-api-documentation" target="_blank">SEC</a> and <a href="https://xbrl.us/home/use/xbrl-api/">XBRL</a> offer Application Programming Interfaces (APIs) that allow researchers to query specific XBRL data in a programmatic fashion. These APIs are great options if you desire to track specific XBRL tags on a regular basis or would like to query a moderate amount of data at once (i.e. not all tags from all companies).

### Data Dump
If your project requires a large amount of data, the SEC also offers <a href="https://www.sec.gov/dera/data/financial-statement-and-notes-data-set.html" target="_blank">regular dumps of XBRL data</a> on a quarterly (2009 through 2020 Q3) and monthly (October 2020 through current) basis. A detailed description of the tables and columns in the data dump can be found in <a href="https://www.sec.gov/files/aqfsn_1.pdf" target="_blank">this file</a>.

Because many projects require data over the course of several years and it may be inconvenient to work with the zipped data dumps, the DARC team also maintains updated copies of the tables in these dumps in <a href="https://redivis.com/datasets/6rpv-9nmqw5tg2" target="_blank"> this Redivis dataset</a>. This dataset is updated on a monthly basis, in concordance with the release of the dumps by the SEC.

We have also created an <a href="https://redivis.com/projects/x9f9-2wm04c5pn" target="_blank">example project on Redivis</a> that illustrates a use case for this XBRL data and how to pull data from the tables. You can check the description field in each transform to understand the queries made.

## Filing Analytics 

WRDS maintains a comprehensive collection of tools called the <a href="https://wrds-www.wharton.upenn.edu/pages/get-data/wrds-sec-analytics-suite/" target="_blank">WRDS SEC Analytics Suite</a>.  It is a “one-stop” research platform that provides standardized service tools to enable users to overcome the challenges in systematically parsing regulatory reports on the SEC website, and quantifying and analyzing information which is qualitative in nature.  Here's a link to the <a href="https://wrds-www.wharton.upenn.edu/documents/745/_001WRDS_SEC_Analytics_Suite_Manual_Dec_2015.pdf" target="_blank">manual</a>.

Here are a few tools and their descriptions that the DARC team has found useful in the WRDS SEC Analytics Suite.

### SEC Filings Index

Comprehensive Daily and Quarterly SEC Filings Index can be found at the WRDS <a href="https://wrds-www.wharton.upenn.edu/pages/get-data/wrds-sec-analytics-suite/wrds-sec-filings-index-data/sec-filings-index/" target="_blank">SEC Filings Index Search</a> site.
From here you can get an idea of what kind of forms were available from which companies dating back to the 1970s.  You can search for a single or a list of CIK, TICKER, or GVKEY company code.  Some of the output variables are:
```
SEC Central Index Key (CIK)
Filing Date (FDATE)
First SECDate with Index Record Information (FINDEXDATE)
Last SECDate with Index Record Information (LINDEXDATE)
SEC Form (Form)
Company Name (CoName)
Reference Name of Complete Report Filing (FName)
Reference Name of Report HTML Index (IName)
Index Source: 1-Daily, 2-Full, 3-Both (SOURCE)
```

{% include note.html content="You can also perform your filings search using the aforementioned [dataset on Redivis](https://redivis.com/datasets/dq12-4q4st0kjt), although you won't retrieve certain identification variables such as CIK and Ticker." %}

### Readability and Sentiment Analysis

The <a href="https://wrds-www.wharton.upenn.edu/pages/get-data/wrds-sec-analytics-suite/wrds-sec-filings-queries/readability-and-sentiment/" target="_blank">Readability and Sentiment Analysis</a> tool is a relatively new addition to the suite.
Please note that the data for this web query is only reliable up to 2019; data after 2019 maybe be incomplete. This work is expected to complete by March of 2023.

The WRDS SEC Readability and Sentiment data extends the WRDS SEC Analytics Suite by providing academic researchers a clean set of text files for every SEC filing since 1994, along with basic sentiment and readability scores. Researchers can use the pre-computed scores to further academic research, and can also compute their own features based on the raw text. You can find more information in the manual about this tool <a href="https://wrds-www.wharton.upenn.edu/documents/751/WRDS_SEC_Readability_and_Sentiment_Manual.pdf" target="_blank">here</a>.

Some of the many counts and scores it outputs include:
```
Complete Report File Size (FSIZE)
Paragraph Count (PARAGRAPHCOUNT)
Raw Character Count (CHARCOUNT_RAW)
Average Number of Words per Sentence (AVERAGEWORDSPERSENTENCE)
Word Count (WORDCOUNT)
Sentence Count (SENTENCECOUNT)
Flesch Reading Ease Index (FLESCH_READING_EASE)
Smog Readability Index (SMOG_INDEX)
Loughran-McDonald Negative Word Proportion (FINTERMS_NEGATIVE)
Loughran-McDonald Uncertainty Word Count (FINTERMS_UNCERTAINTY_COUNT)
Harvard General Inquirer Negative Word Proporation (HARVARDIV_NEGATIVE)
etc...
```

### Filings Search

<a href="https://wrds-www.wharton.upenn.edu/text-search/wrds-sec-filing-search/" target="_blank">SEC Filings Search</a> is where you can search the contents of over 15 million SEC filings. The dataset contains 720 form types, including 10-Ks, 10-Qs, 8-Ks, Proxy and Registration Statements, 40-F Annual Reports, Uploads, and Correspondence.
You can do a syntax search with terms and logic like the following:

Example: \"fried eggs\" +(eggplant \| potato) -frittata

Syntax supports the following:

- \+ signifies AND operation

- \| signifies OR operation

- \- excludes a specific term from your search

- \"\" signifies an exact phrase search

- \* at the end of a prefix acts as a wildcard – e.g., auto*, thermo *

- use \(\) to establish order of precedence for complex queries

- ~N after a word signifies edit distance, or fuzziness. The edit distance, N, is the number of character changes required to transform one word into another – e.g., Anderson~1 will return Anderson, Andersen and Andersan.

- ~N after a phrase indicates how many words can separate the terms in a successful match – e.g., "CEO died"~4 will return "... CEO of this great company, died peacefully."

### SEC Linking Tables

WRDS provides <a href="https://wrds-www.wharton.upenn.edu/pages/get-data/wrds-sec-analytics-suite/wrds-sec-linking-tables/" target="_blank">tables</a> you can use to join datasets with different IDs across time. It is a good idea to <a href="https://www.gsb.stanford.edu/library/research-support/ask-us/" target="_blank">ask a GSB librarian</a> for help on how exactly to use these tables so that you can get the right company matches especially if you are looking at a large span of time. Linking tables include:

- Historical CIK-CUSIP Link Table
- Historical Company Names of SEC Filers
- Historical GVKEY-CIK Link Table

### Bag of Words

WRDS <a href="https://wrds-www.wharton.upenn.edu/pages/get-data/wrds-sec-analytics-suite/wrds-sec-text-analysis/wrds-bag-words/" target="_blank">Bag of Word (BoW) interface</a> provides WRDS SEC Analytics Suite subscribers an alternative way to perform content analysis against company SEC filings. A frequency count of all words in SEC filings and amendments from 1993 through 2017 was prepared. Users can query word counts across all filings, or against specific company filings. Total word occurrence per filing, cosine similarity, Jaccard similarity, minimum edit distance between current and previous filings, word stemming and lemmatization, English word, positive or negative word, stop word, geographic, company name, patent related (requires KtMINE subscription) word indicators etc. are also available. 
You can read more about how words are contructed and what summary measures were applied in the <a href="https://wrds-www.wharton.upenn.edu/documents/1081/WRDS_Bag_of_Words_Manual.pdf" target="_blank">manual</a>. 

Here are some of the modules available:
```
Filing Summary
Similarity Measures
Word Distribution
Word Distribution (all filings)
Word Summary
```
