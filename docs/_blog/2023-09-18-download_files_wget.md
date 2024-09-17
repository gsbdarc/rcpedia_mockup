# How do I download files from the web to the Yens?

Occasionally, it is necessary to download a file from the web to the Yen Servers. Instead of locally downloading then <a href="" target="_blank">transferring</a> the file to the Yens,
we can download the file directly to the Yens. 

First, navigate where you want the file to be downloaded with the `cd` command.
Then use `wget` to download the file. Usually you have to copy the link to the file/folder on the web that you are trying to
download.

### Example
We want to install `Rmpi` R package from source on the Yens. We would navigate to the CRAN website and copy the web
link to <a href="https://cran.r-project.org/web/packages/Rmpi/index.html" target="_blank">the package source file</a>. Then, run

```bash
$ wget https://cran.r-project.org/src/contrib/Rmpi_0.7-1.tar.gz
```

which will download the package source tarball to your Yen directory. If everything worked, you should see:

```bash
--2023-09-15 13:44:12--  https://cran.r-project.org/src/contrib/Rmpi_0.7-1.tar.gz
Resolving cran.r-project.org (cran.r-project.org)... 137.208.57.37
Connecting to cran.r-project.org (cran.r-project.org)|137.208.57.37|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 106286 (104K) [application/x-gzip]
Saving to: ‘Rmpi_0.7-1.tar.gz’

Rmpi_0.7-1.tar.gz            100%[===========================================>] 103.79K   212KB/s    in 0.5s

2023-09-15 13:44:14 (212 KB/s) - ‘Rmpi_0.7-1.tar.gz’ saved [106286/106286]

```

When you list the files in the current directory you will see `Rmpi_0.7-1.tar.gz` present.

When you download the files or transfer them, the files could be compressed with `zip` and will have `.zip` extension.
Transferring compressed files is recommended for faster transfer speeds.

See <a href="/faqs/howToUncompressFiles.html" target="_blank">this page</a> to learn about how to uncompress common compression file types on the Yens.
