---
date:
  created: 2023-09-20
---

# Edit Files on the Command Line


We can utilize JupyterHub Text Editor to <a href="/gettingStarted/8_jupyterhub.html#text-file-editor" target="_blank">directly edit scripts on the Yens</a>. 
However, sometimes it is more convenient to quickly edit files from the command line (without needing to go to a different program like the browser
or editing on your local machine then transferring the edited files).

We will use vim text editor that comes with Linux distributions and can be used on any HPC system or server.

For the purposes of this course, we will make small changes to the slurm scripts or python scripts from the command line.
Do not be discouraged as vim is notorious for its steep learning curve! With practice, it becomes a lot easier.

Vim has several modes:
 - Command mode: in which the user issues editing commands such as search, replace, delete a block and so on
but cannot type directly. When you open a new vi file, you will be in Command mode. 
- Insert mode: in which the user types in edits to the files. We can switch from Command mode to the Insert mode to type in by pressing the `i` key. 
When you are in Insert mode, the bottom of the editor displays `-- INSERT --`. Switch back to Command mode by pressing the `esc` key. 

Let's open up a test file and edit it:

```bash
$ vi test.py
```

On the bottom of the editor, you should see:
```bash
"test.py" [New File]   
```
which says the name of the file you are editing and signals that you are in Command mode (default mode when opening a file).

Now if we want to start typing, press `i` key and make sure the bottom of the editor now says:
```bash
-- INSERT --     
```
 
Then type some test python command:

```python
print("hello world!")
```


To change position of the mouse cursor use arrow keys (to jump to a different line or position the cursor within a line)
or `h`, `j`, `k`, `l` keys.

Let's save and quit the vi editor. First, press `esc` to go back to Command mode (the bottom of the editor should not say Insert).
Then type `:wq` to write and quit vi. This should save the file and return you back to the command line.

After you are back on the command line, let's make sure the file is saved correctly:

```bash
$ cat test.py
```

You should see the file's content that we created:

```py
print("hello world!")
```

Mostly we will stick to these three vi commands throughout the course:

- `i` : switch to Insert mode from Command mode
- `esc`: switch back to Command mode from Insert mode
- `:wq` : to save file and quit out of vi (must be in Command mode)

Download a <a href="https://drive.google.com/file/d/1sBbdrk_UcfX_tfy1jgxBaomwhDWKli2T/view?usp=sharing" target="_blank">short list of useful vim commands</a> to get going with vim
or <a href="https://vim-adventures.com" target="_blank">learn vim while playing a game</a>.

Once you get a hang of vi commands, you will have the power to edit files quickly and directly from the command line.
