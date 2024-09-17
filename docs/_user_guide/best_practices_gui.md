# How Do I Run a Graphical Interface?

If you plan to run `Rstudio`, `MATLAB`, `SAS` or any other Graphical User Interface (GUI),
you will need to connect to the Yens with X-forwarding enabled. UIT has a [page](https://uit.stanford.edu/service/sharedcomputing/moreX) describing this in more detail,
along with information about auxiliary, system-specific software that you will need to have installed before proceeding.

!!! note
    Some common system-specific software include `XQuartz` for Mac users and `Xming` for Windows users.

Make sure you have X11 software installed on your local computer first:

- For **Mac OS**, you need to
have [XQuartz](https://www.xquartz.org/) installed first. XQuartz usually requires restarting your computer before you can use it.

- For **Windows**, you need to have [XMing](https://sourceforge.net/projects/xming/) installed first.

#### Login to Yens with X-forwarding
```
ssh -Y <SUNet ID>@yen.stanford.edu
```

The `-Y` flag here enables X-forwarding, allowing you to run software on the server that uses graphical windows.

When prompted, type your SUNet ID password. Then, complete the two-factor authentication process.
After you successfully login, check that X-forwarding works correctly. Choose any of the following commands and type it in
the yen command line interface as all of them will pop up a window if everything is working correctly - `xeyes`, `xcalc`, `xlogo` or `xclock`
(or choose your favorite X11 command line program).

```bash
xeyes
```
which will pop up a window with eyes tracking where your mouse is.

![](/images/xeyes.png)

### Examples
#### R / RStudio GUI

To run RStudio GUI, load the R module with the version of R that you want:

```bash
ml R/4.0.0
```

List the loaded modules:

```bash
module list

Currently Loaded Modules:
  1) rstudio/1.1.463   2) R/4.0.0
```

We see that RStudio is loaded automatically when you load R module. We can now launch RStudio with:

```bash
rstudio
```

The RStudio GUI will pop open and you can do anything you would normally do in RStudio (but with noticeable delay due to X tunneling):

![](/images/rstudio-gui.png)


If you forget to load R module or loaded only the rstudio module, you will see an error that R is not found:

![](/images/rstudio-err.png)

If that happens, just load `R` module and start RStudio again.
#### MATLAB
To run MATLAB GUI, load the matlab module with the version that you want:

```bash
ml matlab
```

We can now launch MATLAB GUI with:

```bash
matlab
```

The MATLAB GUI will pop open and you can do anything you would normally do (but with noticeable delay due to X tunneling):

#### Stata
For the Stata GUI, load the stata module with the version that you want:

```bash
ml statamp
```
We can now launch the Stata GUI with:

```bash
xstata-mp
```

The Stata GUI will pop open and you can do anything you would normally do (but with noticeable delay due to X tunneling).

## Setting up a Graphical Interface

First, visit [this page](/faqs/howRunGraphicalInterface.html) to learn how to set up X11 forwarding on your machine. The commands `xeyes` and `xclock` are good test examples to make sure your graphical interface forwarding is working.

## Loading STATA

Next, you need to load the STATA software. You can check which STATA versions are available with the `module avail` command.  Let's say you want to load `statamp` - you can do that by running `module load`:

```
module load statamp
```

[This page](/faqs/howRunSpecificSoftwareVersion.html) has more information on loading software on the Yens.

## Running XSTATA

After loading STATA, you need to run the `xstata-mp` command.

```
xstata-mp
``` 

Stata should start with a graphical interface.  Your X11 program will also start.  Stata will probably look a little different than when you run your local copy.  



#### SAS

To run SAS GUI, load the SAS module:

```bash
ml sas
```
We can now launch SAS GUI with:

```bash
sas
```

The SAS GUI will pop open and you can do anything you would normally do (but with noticeable delay due to X tunneling):

![](/images/sas-gui.png)

!!! tip
    Alternatively, you can run the same software that you are used to running as a GUI in JupyterHub! Have a look [here](/yen/webBasedCompute.html) to learn more about JupyterHub on the Yens and the software available.


## Other Page
# Setup

The setup should take about 10 minutes to complete. 

### Download files
You need to <a href="https://drive.google.com/file/d/1rhW5gJKK59oPo99S6aR0ltipbz9rBmZS/view?usp=drive_link" target="_blank">download</a> 
software and files to follow this course.

1. Download `intro-to-yens.zip` and move the file to your Desktop.
2. Unzip/extract the file. Let your instructor know if you need help with this step. You should end up with a new folder 
called `intro-to-yens` on your Desktop.

### Install software
For examples to work, we will need the following software installed:
- <a href="https://www.r-project.org/" target="_blank">R</a>
- <a href="https://www.rstudio.com/products/rstudio/download/" target="_blank">RStudio</a>

In addition, please install the following for your operating system:
#### Windows OS
- <a href="https://mobaxterm.mobatek.net/" target="_blank">MobaXterm</a> which gives you a terminal and the ability to run Unix commands, SSH client and an X server. An X server is used to manage graphical display and GUI's.  

#### Mac OS
- <a href="https://www.xquartz.org/" target="_blank">XQuartz</a> which gives you an X server. 

## Other Page
## Running Software with a GUI

### Running R Software with a Graphical Interface
An X server is used to manage graphical display and GUI's. Make sure you have X server installed on your local computer first:

- For **Mac OS**, you need to 
have <a href="https://www.xquartz.org/" target="_blank">XQuartz</a> installed first. XQuartz usually requires restarting your computer before you can use it.

- For **Windows**, you need to have <a href="https://mobaxterm.mobatek.net/" target="_blank">MobaXterm</a> installed first. 

To run a Graphical User Interface (GUI) such as RStudio, MATLAB IDE, and SAS, we need to logout (type `exit` or `logout`) and log back in to the Yens with X forwarding.
Once you logged out of the Yens, login with:

```bash
$ ssh -Y <SUNetID>@yen.stanford.edu
```

When prompted, type your SUNet ID password. Then, complete the two-factor authentication process.
After you successfully login, check that X-forwarding works correctly. Choose any of the following commands and type it in 
the yen command line interface as all of them will pop up a window if everything is working correctly - `xeyes`, `xcalc`, `xlogo` or `xclock` 
(or choose your favorite X11 command line program).


```bash
$ xeyes
```
which will pop up a window with eyes tracking where your mouse is.

![](/images/xeyes.png)


#### R / RStudio GUI

To run RStudio GUI, load the R module with the version of R that you want:

```bash
$ ml R
```

List the loaded modules:

```bash
$ ml 
```

```bash
Currently Loaded Modules:
  1) rstudio/2022.07.2+576   2) R/4.2.1
```

We see that RStudio is loaded automatically when you load R module. We can now launch RStudio with:

```bash
$ rstudio
```

The RStudio GUI will pop open and you can do anything you would normally do in RStudio (but with noticeable delay due to X tunneling):

![](/images/rstudio-gui.png)


If you forget to load R module or loaded only the rstudio module, you will see an error that R is not found:

![](/images/rstudio-err.png)

If that happens, just load R module and start RStudio again.
