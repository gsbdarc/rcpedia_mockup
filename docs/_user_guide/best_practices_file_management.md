A working directory for a research project can fill up fast and become extremely messy in the process. If you are not careful with how you manage your files in a directory, you could easily end up with thousands of files titled `1.csv`, `2.csv`, `10.csv`, `100.csv`, etc. in a single directory with no index or metadata to describe the contents of those files. This is especially commonplace when running automated tasks that quickly generate new data. Not only will this result in confusion for the researchers using a directory, but it can cause unintended consequences for the processes monitoring the file system or later audits.

Here are some best practices for file management that you can use the next time you start a project directory.

## Limit the Number of Files in One Directory

One of the most common bad practices in file management is placing tens of thousands of files in a single folder. This may seem harmless at first as there is no barrier or warning when placing a lot of files in a folder, but ultimately it hurts the performance of a file system and many tools that monitor the file system. For instance, listing the contents of a directory with too many files (`ls`) will be extremely slow and hang. Also, tools that make backup copies of files for disaster recovery will get stuck in directories with tons of files and essentially fail, impacting all users. It is a much better idea to split your files into multiple directories, each with a maximum of only a few thousand files.  

{% include tip.html content="If running `ls` on a directory takes more than a few seconds to complete, then you should consider splitting up the files in that directory into multiple folders." %}

## Build a Directory Structure

In addition to solving the above performance issues, splitting your files into multiple directories also helps with the intuitive organization of your data. Say that you are collecting text from 100,000+ news articles on a website where the unique identifier of an article is a combination of the date of the article and some other number like `20111009-91`. Rather than dumping all of the resulting text files into a single directory, you can use the extra information provided by the identifier to create an easy-to-understand folder structure that also splits your files:

```
data
│   README.md
│   index.csv    
│
└───2010
│   └───01
│       │   20100105-10.txt
│       │   20100106-12.txt
│       │   ...
│   │   ...
│   └───10
│       │   20101002-100.txt
│       │   ...  
└───2011
│   └───03
│       │   20110312-5.txt
│       │   20110315-200.txt
│       │   ...
│...
```
In this example, the `data` directory is split by year and then additionally by month based on the article identifier. If you expect that the number of articles in a month could exceed several thousand, you could further divide your directory structure by day to reduce the load on each folder. 

## Create an Index File
A common explanation for why a user would want to place all of their data files in a single directory is that it is easier for processing with a script. In this argument, the user could just feed the script a single path and then run a command that lists the contents of the directory within the script to then process. However, there is a much better practice: creating an index file.

An index file is simply a listing of all of the files in your directory structure and can be created while populating your directories with data. This resulting file can be fed to your processing script just as easily as the aforementioned path and will be much faster to load than listing the contents of your bloated directory. Furthermore, an index file can be used to keep track of valuable metadata in the contents of your data files that may not be evident in the filename or directory structure. For example, a CSV index file for the aforementioned news articles might look like:

| filename | filepath | year | month | day | title | processed? |
| -------- | -------- | ---- | ----- | ---- | ----- | ---------- |
| 20100105-10.txt | data/2010/01/ | 2010 | 1 | 5 | Incumbent Mayor Loses Election | True 
| 20100106-12.txt | data/2010/01/ | 2010 | 1 | 6 | Mayor Elect: "Changes Coming Soon" | False
| 20101002-100.txt | data/2010/10/ | 2010 | 10 | 2 | New Program Tested at Local Middle School | False
| 20110312-5.txt | data/2011/03/ | 2011 | 3 | 12 | 39-year Veteran Officer Passes Away | True
| 20110315-200.txt | data/2011/03/ | 2011 | 3 | 15 | Crab Fest This Weekend! | True

<br>
In addition to the "title" column in this sample index file, notice another column titled "processed?", which can be used to keep track of whether a specific file has been processed by your script. Creating an index file like this also makes it easier to migrate your processing jobs to run in parallel or into a job submission infrastructure.

## Compress or Dump Large, Unused Directories
It is easy to forget and leave behind your large directories once you are finished with a project, but this can cause a burden for backup and auditing tools and also make it difficult to transfer those files to a different system later on. If you know for sure that you are finished with a project and will not return to your files, please delete your large directories to free up precious storage space for other researchers. If there is a possibility that you may need to access your files again, but not in the near future, please compress your files. [This page](/gettingStarted/17_archive.html) discusses in detail how to archive your project directory.
