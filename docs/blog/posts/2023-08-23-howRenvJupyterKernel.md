---
date:
  created: 2023-08-23
<<<<<<< HEAD:docs/_blog/2023-08-23-howRenvJupyterKernel.md
categories:
    - Reproducibility
    - Research
---
<!--
---
title: How do I export my R environment to JupyterHub?
layout: indexPages/faqs
subHeader: Data, Analytics, and Research Computing.
keywords: Jupyter, faq, notebook, R, Yens, environment
category: faqs
parent: faqs
section: software
order: 1
updateDate: 2023-08-23
=======
>>>>>>> 52ec07f1356c9af6e7158a2f327c8651ff74e0fd:docs/blog/posts/2023-08-23-howRenvJupyterKernel.md
---
-->

# How do I export my R environment to JupyterHub?

If you've created an `R` virtual environment and want to use it as a kernel in JupyterHub, follow the steps below.

!!! note
    Want to use a Python virtual environment in JupyterHub? Have a look at [this page](/_getting_started/jupyter/)

### Launch `R` in Virtual Environment
To start, open a terminal window, SSH into the Yens, and launch the instance of `R` associated with your virtual environment.

```bash
$ /path/to/virtual/environment/bin/R
```

### Install and Use `IRkernel`
Once in your instance of `R`, install the `IRkernel` package and create a Jupyter kernel for your `R` environment.

```R
R version 4.2.1 (2022-06-23) -- "Funny-Looking Kid"
Copyright (C) 2022 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

> install.packages("IRkernel")
> library("IRkernel")
> IRkernel::installspec(name = 'rtest', displayname = 'This is a test R environment')
```

### Check Kernel Existence
Exit out of your instance of `R` and check for the existence of your new Jupyter kernel.

```bash
$ ml anaconda3
$ jupyter kernelspec list

Available kernels:
rtest                 /home/users/mpjiang/.local/share/jupyter/kernels/rtest
```

### Use Kernel in JupyterHub
Open a JupyterHub session in your browser and you should now find your R environment available as a kernel under the `displayname` that you chose:

![](/images/R-jupyter-kernel.png)
