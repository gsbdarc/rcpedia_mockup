---
date:
  created: 2022-11-14
categories:
    - Yen
    - Software
---
# Installing Software on the Yens

As a yen user, you can install your own custom software in your home directory or any location where you have permissions
(such as a shared project space). If you are working with other researchers on a shared project, it is a good idea to have 
a dedicated shared `software` directory where you can install required software. 

As an example, we can install a newer [Tesseract software](https://github.com/tesseract-ocr/tesseract) which is free and is developed by Google. 
Tesseract is an optical character recognition (OCR) tool and python `pytesseract` package is a Tesseract wrapper for python. 
The yens have a default version of Tesseract installed but we can install a newer version of it. 

Check the default Tesseract version already installed on the yens:
```bash
$ tesseract --version
```

We need to go the [releases repo](https://github.com/tesseract-ocr/tesseract/releases) and copy the link to the source code tarball (`tar.gz` file).

Then we download the source code to the yens with `wget` command and pasting the link to the source code.
For this example, I am using a shared directory in `/zfs/gsb/intermediate-yens/software` but choose a shared location
where you want the software to be installed and use the correct path to it instead.

First, make directory where you want the binary to be (this should be a shared project space if you want
other research to be able to use the software):
 
```bash
$ mkdir /zfs/gsb/intermediate-yens/software/tesseract-5.2.0
```

Navigate where you want to download the source file to (you can also download the source to your home):

```bash
$ cd /zfs/gsb/intermediate-yens/software
```

Download the source code:
```bash
$ wget https://github.com/tesseract-ocr/tesseract/archive/refs/tags/5.2.0.tar.gz 
```

Untar the source code:
```bash
$ tar -zxvf 5.2.0.tar.gz
$ cd tesseract-5.2.0/
```

Install in a location such as `/zfs/<project-dir>/software` by specifying the desired install location
with `--prefix` argument in `configure` execution (use the directory path you made above):

```bash
$ ./autogen.sh
$ ./configure --prefix=/zfs/gsb/intermediate-yens/software/tesseract-5.2.0
$ make
$ make install
```

If everything completes successfully, add a path to the bin directory in your bash profile.
```bash
$ echo 'export PATH=/zfs/gsb/intermediate-yens/software/tesseract-5.2.0/bin:$PATH' >> ~/.bash_profile
```

Tesseract also needs to have an English tessdata file (or other language train data) to use language data models as described [here](https://github.com/tesseract-ocr/tessdata). We download [`eng.traineddata`](https://github.com/tesseract-ocr/tessdata/blob/main/eng.traineddata) file and copy it to `tesseract-5.2.0/tessdata` directory.

Now, we can call `tesseract` executable from anywhere on the yen's file system.

Source the bash profile to execute the added `export PATH` command:
```bash
$ source ~/.bash_profile
```

Check the new tesseract version:
```bash
$ cd
$ tesseract --version
```

You should see the updated version:
```bash
tesseract 5.2.0
 leptonica-1.82.0
  libgif 5.1.9 : libjpeg 8d (libjpeg-turbo 2.1.1) : libpng 1.6.37 : libtiff 4.3.0 : zlib 1.2.11 : libwebp 1.2.2 : libopenjp2 2.4.0
 Found AVX
 Found SSE4.1
 Found OpenMP 201511
 Found libarchive 3.6.0 zlib/1.2.11 liblzma/5.2.5 bz2lib/1.0.8 liblz4/1.9.3 libzstd/1.4.8
 Found libcurl/7.81.0 OpenSSL/3.0.2 zlib/1.2.11 brotli/1.0.9 zstd/1.4.8 libidn2/2.3.2 libpsl/0.21.0 (+libidn2/2.3.2) libssh/0.9.6/openssl/zlib nghttp2/1.43.0 librtmp/2.3 OpenLDAP/2.5.13
```

Finally, clean up by removing the source tarball (especially important if you downloaded the tarball to your home so we keep our home directory tidy and under the 50 G space limit):

```bash
$ cd /zfs/gsb/intermediate-yens/software/
$ rm 5.2.0.tar.gz
```
