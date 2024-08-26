# Run Interactive Jobs

### Running R software without a graphical interface

The R software is installed system-wide but every user manages her own R packages that will live in her home directory (by default).
Every R version will also have its own library separate from other versions. For example, R 3.6 will have user 
installed packages side by side with R 4.0 library with the user installed packages for that version. When  you upgrade your
R version (to run code with a newer R version), you will need to install packages for that new R version. But once the package is
installed, you can use it in your scripts without having to reinstall it every time you login. Also, on the yens, system admins
will install newer R versions for the users. You can [let DARC know](mailto:gsb_darcresearch@stanford.edu) if you need a newer version of software that is currently available on the system.

#### Installing R packages

Load the R module with the version that you want (R 3.6.1 is the current default).

For example, let's use the newest R version available on the yens:

```bash
$ ml R/4.2.1
```

Start interactive R console by typing `R`.

You should see:

```R
R version 4.2.1 (2022-06-23) -- "Funny-Looking Kid"
Copyright (C) 2022 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.

R is a collaborative project with many contributors.
Type 'contributors()' for more information and
'citation()' on how to cite R or R packages in publications.

Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

>
```

Let's install two multiprocessing packages on the yens that we will use for the R example. 

```R
> install.packages('foreach')
```
If this is your first time installing R package for this R version on the Yens, you will be asked to create a personal library
(because users do not have write permissions to the system R library):

```R
Warning in install.packages("foreach") :
  'lib = "/software/free/R/R-4.2.1/lib/R/library"' is not writable
Would you like to use a personal library instead? (yes/No/cancel) yes

Would you like to create a personal library
‘~/R/x86_64-pc-linux-gnu-library/4.2’
to install packages into? (yes/No/cancel) yes
```
Answer `yes` to both questions to create a personal library in your home directory. The library path is 
`~/R/x86_64-pc-linux-gnu-library/4.2` where all of the user packages will be installed. Once the library is created, next 
package will be installed there automatically.

Pick any mirror in the US. 

```R
Installing package into ‘/home/users/nrapstin/R/x86_64-pc-linux-gnu-library/4.2’
(as ‘lib’ is unspecified)
--- Please select a CRAN mirror for use in this session ---
Secure CRAN mirrors

 1: 0-Cloud [https]
 2: Australia (Canberra) [https]
...
74: USA (IA) [https]
75: USA (MI) [https]
76: USA (OH) [https]
77: USA (OR) [https]
78: USA (TN) [https]
79: USA (TX 1) [https]
80: Uruguay [https]
81: (other mirrors)

Selection: 77
```

If the package is successfully installed, you should see:

```R
* DONE (foreach)

The downloaded source packages are in
	‘/tmp/RtmpsYpzoP/downloaded_packages’
```

Then install `doParallel` package: 

```R
> install.packages("doParallel")
```

When the package is done installing, you will see:

```R
* DONE (doParallel)

The downloaded source packages are in
	‘/tmp/Rtmpwy8WeV/downloaded_packages’
```

#### Run R code interactively

Once we have loaded R module, launched R and installed R packages that we are going to use, we are ready to run our code. 
You can run R code line by line interactively by copying-and-pasting into the R console. 
For example,

```R
> print('Hello!')
[1] "Hello!"
```

The advantage of interactive console is that the results are printed to the screen immediately and if you are developing code
or debugging, it can be very powerful. But the disadvantage is that if you close the terminal window or lose connection,
the session is not saved and you will need to reload the R module and paste all of the commands again. 
So, use this method for when you need interactive development / debugging environment. Another disadvantage is that if you 
did not login with the graphical interface (X11 forwarding) you will not be able to plot anything in the interactive console.
So, if you need plots and graphs, either use `-Y` flag when connecting to the Yens or use <a href="/gettingStarted/8_jupyterhub.html" target="_blank">JupyterHub</a>. 

We can then quit out of R without saving workspace image:

```R
> q()
Save workspace image? [y/n/c]: n
```
#### Run R code on the command line
If you want to simply run the script, you can do so from the command line. 

We are going to run the same code that we ran on our local machine, `swiss-parallel-bootstrap.R`.

{% include warning.html content="Because this R code uses multiprocessing and the yens are a shared computing environment, we need to be careful about how R sees and utilizes the shared cores on the yens."%}


Let's update the script for the yens. Edit the script on JupyterHub in the Text Editor. 
Instead of using `detectCores()` function, we will hard code the number of cores for
the script to use in this line in the R script:

```R
ncore <- 1 
```

Thus, the `swiss-parallel-bootstrap.R` script on the yens should look like:
```R
# Run bootstrap computations on swiss data set
# Plot histogram of R^2 values and compute C.I. for R^2
# Modified: 2021-09-01
library(foreach)
library(doParallel)
library(datasets)

options(warn=-1)

# set the number of cores here
ncore <- 1

print(paste('running on', ncore, 'cores'))

# register parallel backend to limit threads to the value specified in ncore variable
registerDoParallel(ncore)

# Swiss data: Standardized fertility measure and socio-economic indicators for each of 47 French-speaking provinces of Switzerland at about 1888.
# head(swiss)
#             Fertility Agriculture Examination Education Catholic Infant.Mortality
#Courtelary        80.2        17.0          15        12     9.96             22.2           
#Delemont          83.1        45.1           6         9    84.84             22.2
#Franches-Mnt      92.5        39.7           5         5    93.40             20.2
#Moutier           85.8        36.5          12         7    33.77             20.3
#Neuveville        76.9        43.5          17        15     5.16             20.6
#Porrentruy        76.1        35.3           9         7    90.57             26.6

# dim(swiss)
# [1] 47  6 
# number of bootstrap computations
trials <- 50000

# time the for loop
system.time({
    boot <- foreach(icount(trials), .combine=rbind) %dopar% {

    # resample with replacement for one bootstrap computation
    ind <- sample(x = 47, size = 10, replace = TRUE)

    # build a linear model
    fit <- lm(swiss[ind, "Fertility"] ~ data.matrix( swiss[ind, 2:6]))
    summary(fit)$r.square
  }
})

# Plot histogram of R^2 values from bootstrap 
hist(boot[, 1], xlab="r squared", main="Histogram of r squared")

# Compute 90% Confidence Interval for R^2
print('90% C.I. for R^2:')
quantile(boot[, 1], c(0.05,0.95))
```


After loading the R module, we can run this script with `Rscript` command on the command line:

```bash
$ Rscript swiss-parallel-bootstrap.R
```

```bash
Loading required package: iterators
Loading required package: parallel
[1] "running on 1 cores"
   user  system elapsed
 47.231   0.038  47.280
[1] "90% C.I. for R^2:"
       5%       95%
0.6558154 0.9894657
```
Again, running this script is active as long as the session is active (terminal stays open and you do not lose connection).

---
<a href="/gettingStarted/8_jupyterhub.html"><span class="glyphicon glyphicon-menu-left fa-lg" style="float: left;"/></a> <a href="/gettingStarted/10_screen.html"><span class="glyphicon glyphicon-menu-right fa-lg" style="float: right;"/></a>



## How Do I Schedule Jobs on the Yens?

You may be used to using a job scheduler on [other Stanford compute resources](https://srcc.stanford.edu/about/computing-support-research) (e.g. Sherlock, etc.) or servers from other institutions. However, the Yen servers have traditionally run without a scheduler in order to make them more accessible and intuitive to our users. The ability to log onto a machine with considerably more resources than your laptop and immediately start running scripts as if it was still your laptop has been very popular with our users. This is the case on `yen1`, `yen2`, `yen3`, `yen4` and `yen5`.

{% include tip.html content="Take a look [here](/yen/index.html) to see more details about the Yen hardware." %}

The downside of this system is that resources can be eaten up rather quickly by users and you may find a particular server to be "full". To combat this, we have implemented the SLURM scheduler on our `yen-slurm` servers. For users familiar with scheduler systems, this should be a seamless transition. For those unfamiliar, please have a look [here](/yen/scheduler.html) to learn how to get started.