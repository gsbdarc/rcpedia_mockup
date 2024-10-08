## JupyterHub as a Graphical Environment

Many research aplications, including RStudio, Matlab and Jupyter Notebooks are now available natively on the web through the [JupyterHub Interface](/_getting_started/jupyter/).

## Alternatives to JupyterHub

If you plan to run `Stata`, `SAS` or any other Graphical User Interface (GUI) that is not configured for Jupyter, you will need to connect to the Yens with **X-forwarding** enabled. UIT has a [page](https://uit.stanford.edu/service/sharedcomputing/moreX) describing this in more detail, along with information about auxiliary, system-specific software that you will need to have installed before proceeding.

!!! warning
    X-forwarding requires an excellent network connection to function well, and is fundamentally less stable than web-based interfaces.


* For **Mac OS**, you need to have [XQuartz](https://www.xquartz.org/) installed first. XQuartz usually requires restarting your computer before you can use it.

* For **Windows**, you need to have additional software installed. Users have reported success with 

    * [XMing](https://sourceforge.net/projects/xming/) for a lightweight X server and SSH client
    * [MobaXterm](https://mobaxterm.mobatek.net/) for a full-featured terminal

#### Login to Yens with X-forwarding
```title="Terminal Command"
ssh -Y <SUNet ID>@yen.stanford.edu
```

The `-Y` flag here enables X-forwarding, allowing you to run software on the server that uses graphical windows.

When prompted, type your SUNet ID password. Then, complete the two-factor authentication process.
After you successfully login, check that X-forwarding works correctly. Choose any of the following commands and type it in the yen command line interface as all of them will pop up a window if everything is working correctly - `xeyes`, `xcalc`, `xlogo` or `xclock` (or choose your favorite X11 command line program).

```title="Terminal Command"
xeyes
```
which will pop up a window with eyes tracking where your mouse is.

![](/assets/images/xeyes.png)

### Examples
!!! tip "Notebooks can be used as an Alterative to a traditional GUI"
    SAS, Stata, R, Python and Julia are avaiable to run in a **notebook interface** within JupyterHub. Have a look [here](/_getting_started/jupyter/) to learn more about JupyterHub on the Yens and the software available.
#### Stata
For the Stata GUI, load the stata module with the version that you want:

```title="Terminal Command"
ml statamp
```
We can now launch the Stata GUI with:

```title="Terminal Command"
xstata-mp
```

The Stata GUI will pop open and you can do anything you would normally do. You may wish to use Stata in a Jupyter Notebook. **todo**: link to instructions

#### SAS

To run SAS GUI, load the SAS module:

```title="Terminal Command"
ml sas
```
We can now launch SAS GUI with:

```title="Terminal Command"
sas
```

The SAS GUI will pop open and you can do anything you would normally do (but with noticeable delay due to X tunneling):

![SAS GUI](/assets/images/sas-gui.png)