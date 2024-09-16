# Storage Solutions

At Stanford Graduate School of Business, we offer several storage options to support your research. To determine the best storage solution for your research, key factors such as data size, security, access restrictions, and computing needs must be considered. Below is a brief overview of each storage option available

!!!warning
    Before transferring data to any platform, make sure the data is licensed for your use and that the storage platform meets the security requirements for that data.

## Preferred Platforms:
- **ZFS:** The GSB's 612 TB high-performance storage solution. Currently, all Yen user and project directories reside on ZFS. Snapshots are taken of the data and are easily recoverable. ZFS is the ideal solution if you are performing your analysis or computational work on the Yens.
- **Google Drive:** Available to all users at Stanford. [Approved](https://uit.stanford.edu/service/gsuite/drive){:target="_blank"} for low, medium and high risk data. Limited to 400,000 files and throttled to 750 GB upload per day. Ideal for audio, video, PDFs, Images, and flat files. Great for sharing with external collaborators. Also appropriate for [archiving research data](/_user_guide/best_practices_archive/){:target="_blank"}
 - **Oak:** Similar to ZFS, [Oak](https://uit.stanford.edu/service/oak-storage){:target="_blank"} is a High-Performance Computing (HPC) storage system available to research groups and projects at Stanford for research data. Oak is not snapshotted; deleted data is lost. It costs about $45 per 10 TB. If you expect to use [Sherlock](/_policies/sherlock/){:target="_blank"}, you will need to use Oak.
 - **Redivis:** [Redivis](https://redivis.com/){:target="_blank"} allows users to deploy datasets in a web-based environment (GCP backend) and provides a powerful query GUI for users who don't have a strong background in SQL. 

## Other Stanford Platforms

The following storage platforms are currently supported but users are discouraged from relying on them for continuing research:

 - **AFS:** [Andrew File System.](https://uit.stanford.edu/service/afs){:target="_blank"}
 - **Box:** Stanford University [Box](https://uit.stanford.edu/service/box){:target="_blank"} provided basic document management and collaboration through Box.com. As of February 28, 2023, university IT
 retired the Box service and has taken steps to [migrate Box content](https://uit.stanford.edu/project/box-migration){:target="_blank"} to a new folder on Google Drive or Microsoft OneDrive.
 
## Cloud Platforms

Storing data in the cloud is an effective way to inexpensively archive data, serve files publicly, and integrate with cloud-native query and compute tools. With the growing number of cloud storage options and security risks, we advise caution when choosing to store your data on any cloud platform. If you are considering cloud solutions for storage, please contact [DARC](mailto:gsb_darcresearch@stanford.edu) to discuss your needs.

## File Storage

You have several options for where to store your research files (data sets, programs, output files, and so forth). This guide will help you decide which storage location is best for your situation.

## Yen File System 

If you are new to using the Unix shell, please go over the <a href="/gettingStarted/shell_novice.html" target="_blank">Shell Introduction</a>
first.
 
If you’re already comfortable manipulating files and directories (using `ls`, `pwd`, `cd`, `mv`, `rm` commands), 
you probably want to explore the next lesson: <a href="/gettingStarted/shell_extras.html" target="_blank">Shell Extras</a>, 
to learn about searching for files with `grep` and `find`, and writing simple shell loops and scripts.
 
### Home Directory
Every user on the Yens has a home directory. This is where you are when you login to the system.
Check the absolute path with:

```bash
$ pwd
```

This will print your working directory (where `<SUNetID>` is your SUNet ID):

```bash
/home/users/<SUNetID>
```

To see this schematically, here is a visualization of the home directory on the file system:


![](/images/intro_to_yens/home-dir.png)

The squares with `...` in them indicate more directories that are not shown in the graph.

The path to your home directory is stored in `$HOME` environment variable. To see it, run:

```bash
$ echo $HOME
```

The `echo` command prints out the environment variable `$HOME` which stores the path to your home directory 
(where `<SUNetID>` is your SUNet ID):

```bash
/home/users/<SUNetID>
```

The home directory is not for storing large files or outputting large files while working on a project. It is a good place to store small
files like scripts and text files. Your home directory storage space is capped at 50 G.  

To see how much space you have used in your home directory, run:

```bash
$ gsbquota
```

You should see your home directory usage:

```bash
/home/users/<SUNetID>: currently using X% (XG) of 50G available
```
where `X%` and `XG` will be actual percent used and gigabytes used, respectively.

## File Storage

You have several options for where to store your research files (data sets, programs, output files, and so forth). 

### ZFS Directories

The GSB now has nearly 1 PB of high-performance storage available from the Yen servers under the path ```/zfs```. 

!!!Tip
    ZFS is mounted only from the yen servers. You cannot access it from Sherlock, FarmShare or any other system.

### Project Directory

If you are a GSB researcher that is interested in starting a new project on the Yens,
please complete and submit DARC’s new [project space request form](http://darc.stanford.edu/yenstorage){:target="_blank"}.
This form allows you to estimate disk usage, and specify any collaborators that should be added to the shared access list.
ZFS project access is granted by [workgroups](/_policies/workgroups/){:target="_blank"}.

The project directories on ZFS have much bigger quotas (1 T default). However, we ask that you be responsible and
delete what you no longer need such as intermediate files, etc.

Schematically, we can visualize the path to the project directory as follows:

![](/images/intro_to_yens/project-dir.png)

The absolute path to your project space is:

```bash
/zfs/projects/students/<your-project-dir>
```

where `<your-project-dir>` is the name of your project directory (created for you by the DARC team after the request for a new project space form is filled out). If you are a faculty, your new project will live in `/zfs/projects/faculty` directory.

### Local Disk

On each Yen machine, there is a local scratch space mounted at ```/scratch```. All yen users are free to make use of this space. Much like a hard drive on your laptop, this can be accessed only from that single Yen machine. 

!!!Warning
    Note that scratch space on all Yens is cleared during system reboots, and is subject to intermittent purging as needed by the admins. Therefore local scratch space is usually best only for temporary files.

### ZFS Directories

!!!Important
    The Yen servers are *not* approved for high risk data.

The GSB has nearly 1 PB of high-performance storage available from the yen servers under the path ```/zfs```. Currently all yen user directories (``` ~/```) reside on ZFS. In addition to user home directories, Stanford GSB faculty (and in some cases students, see below), may [request additional project space](/services/newProject.html){:target="_blank"} on ZFS. 

!!!Tip
    ZFS is mounted only from the Yen servers. You cannot access it from Sherlock, FarmShare or any other system.

**GSB Faculty**

All GSB faculty may request project space on ZFS, and DARC will set up a corresponding Stanford workgroup that you may use to add and remove collaborators for your project. Quotas are set for faculty ZFS directories based on expected space requirements. However, we understand that initial space estimates may be insufficient and thus we can grant storage quota increases upon request later. But kindly do your part and be a good steward of the commons by

- Archiving projects or infrequently accessed files when you can (see [here](/gettingStarted/17_archive.html){:target="_blank"})
- Deleting intermediate files that you no longer need to use

**GSB Students**

While ZFS is primarily a resource for Stanford GSB faculty, under certain conditions Stanford GSB graduate students may also be granted project space in ZFS. If you feel you are in need of student project space on ZFS (as distinct from a faculty led project) please contact us at <gsb_darcresearch@stanford.edu>. The default size for student project space is 200 GB, but let us know if you need more space for your student project.

### Yen Home Directories

Home directories on the Yen servers are also stored on our storage system. Your home directory has a quota of 50 GB.

!!!Tip
    To check your home directory quota, use the `gsbquota` command.

When you log into the Yen servers you will automatically land in your home directory, which is located at ```/home/users/<SUNetID>``` or with the shortcut `~`. You are able to access your former AFS home directory by following the ```afs-home``` symlink inside your home directory. 

!!!Important
    Please note that if you continue to work and save files within your older afs-home directory, you will still be limited to the old AFS disk quota (5 GB).

### Scratch Space 
There is a large ZFS based scratch space, accessible from any yen, at ```/scratch/shared```, which is 100 T in size. Reads and writes to this space are slower than to local disk.

### Local Disk

On each Yen machine, there is local disk space mounted at ```/tmp```, which is over 1 T in size. Reading and writing from ```/tmp``` is a lot faster because I/O operations do not have to go via the slow network. All yen users are free to make use of this space. Much like a hard drive on your laptop, this can be accessed only from that single Yen machine. Be careful not to fill up `/tmp` completely as jobs running on that Yen node may crash in unexpected ways. Be a good citizen and delete the files you no longer need. 

!!!Warning
    Note that ```/scratch``` and ```/tmp``` space on all yens is cleared during system reboots, and is subject to intermittent purging as needed by the admins. Therefore local ```/tmp``` or ```/scratch``` spaces are best only for temporary files.

### AFS Volumes

You have a personal AFS volume that is named according to your SUNetID. For example If your SUNetID is johndoe13, then then the path to your AFS directory is: ``` /afs/ir/users/j/o/johndoe13```. The two individual letters are the first two letters of the SUNetID.

You may have access to other AFS volumes set up for specific projects, or other people may give you access to a specific directory in their AFS volume. To access other AFS volumes, you need to know what the path is. For example, the path might be something like ```/afs/ir/data/gsb/nameofyourdirectory```.

**How to access an AFS volume**

You can transfer files to and from AFS using [OpenAFS](https://uit.stanford.edu/software/afs){:target="_blank"} using your desktop, a free download available from Stanford. This software will mount your AFS directory so that you can access it using an Explorer (Windows) or Finder (Mac) window as you do with other files. 

!!!Important
    There are no longer any plans to sunset AFS completely but WebAFS was retired and not available to use. For its alternatives, visit this [page](https://afs.stanford.edu/){:target="_blank"}.

**How to create an AFS volume**

If you are working with a faculty member on a project that uses AFS, chances are that person already has an AFS directory created for that project. Just ask the faculty member what the path to the directory is, and to grant you permissions to use it. Pleases note that there is no automatic provisioning of home directories for new faculty members. 

**Size Limitations**

As of this writing, AFS volumes at Stanford can be as large as **256 GB**. However, it is possible to chain multiple volumes together in one Linux directory using [symbolic links](http://stackoverflow.com/questions/1951742/how-to-symlink-a-file-in-linux){:target="_blank"}. 

**Backups**

All AFS directories are backed up nightly.  Any file or directory that existed for at least 24 hours before it was deleted, can be restored by submitting a [HelpSU request](https://helpsu.stanford.edu/){:target="_blank"}.


## How to Check ZFS Space Quota

By default, each Yen user is allotted 50 GB of space in their ZFS home directory:

```
/home/users/<SUNet ID>/
```

To determine how much of your quota you have used, you can simply type:
```
$ gsbquota
```

The resulting output will look something like:
```
/home/users/<SUNet ID>: currently using 50% (25G) of 50G available 
```

You can also check size of your project space by passing in a full path to your project space to `gsbquota` command:

```
$ gsbquota /zfs/projects/students/<my-project-dir>/
/zfs/projects/students/<my-project-dir>/: currently using 39% (78G) of 200G available
```


!!!Important
    Please report any issues with <code class=\"highlighter-rouge\">gsbquota</code> to the <a href=\"mailto:gsb_darcresearch@stanford.edu\">DARC team</a>.

## How to Get More Space on ZFS

If the space you have been allocated in your ZFS home directory ([check your quota](/faqs/howCheckDiskQuota.html){:target="_blank"}) is not sufficient for your needs, there are a couple options that you can request, depending on whether or not you are a GSB faculty member.

!!!Tip
    Learn more about storage space on the Yens [here](/storage/fileStorage.html){:target="_blank"}.

## Faculty Projects
We have reserved ZFS space specifically for faculty-led research projects. Access to these project spaces are managed with Stanford [workgroups](https://uit.stanford.edu/service/workgroup){:target="_blank"} and must be administrated by a Stanford Graduate School of Business faculty member. Each folder is tied to a single research project and faculty member. Even if you have an existing Faculty Project directory, if you need additional space for a different project, you should put in a separate request.

Please read [this page](/services/newProject.html){:target="_blank"} to learn more about the request process. You can make a new Faculty Project space request [here](http://darc.stanford.edu/yenstorage){:target="_blank"}.

## Student Projects
We also have reserved ZFS space for student-led research projects. The access for these project spaces are also managed with Stanford [workgroups](https://uit.stanford.edu/service/workgroup){:target="_blank"}. As opposed to faculty-led research project spaces, student project spaces have less allocated space (hard limit of 200 GB) and are subject to purging if overall ZFS space is running low. If the latter situation happens, we will notify you and provide ample time to store your data elsewhere. Furthermore, on an annual basis at the beginning of Winter Quarter, we will contact all owners of student project spaces to check whether the space needs to be renewed for another year.

Please read [this page](/services/newProject.html){:target="_blank"} to learn more about the request process. You can make a new Student Project space request [here](http:/darc.stanford.edu/yenstorage){:target="_blank"}.

<br>
If the above two options are not sufficient for your situation, Please email the [DARC](mailto:gsb_darcresearch@stanford.edu) team to discuss further.

## How Do I Recover ZFS Files

Files on ZFS are backed up in **snapshots** for some amount of time, so if you need to recover something you accidentally deleted, luckily you can still access it! Please email the [DARC](mailto:gsb_darcresearch@stanford.edu) team for help! 

Here is an example of something that might happen:

- You are working in the directory `/zfs/projects/faculty/hello-world/` and have a couple of files named `results.csv` and `results_temp.csv` that you made yesterday. The latter file was clearly temporary and so you want to remove it to clean things up:
    ```
    rm /zfs/projects/faculty/hello-world/results.csv
    ```

- Oops, you accidentally deleted the file you wanted to keep! Only `results_temp.csv` remains. Luckily, since you made the files yesterday, there are likely snapshots available. 

Note that snapshots are taken every 10 minutes and retained at very set frequencies. The current snapshot retainment policy is as follows: 

* <u>10-minute</u> --- retain most recent hour's worth of snapshots
* <u>Hourly</u> --- retain 1 day of hourly snapshots
* <u>Daily</u> --- retain 1 week of daily snapshots
* <u>Weekly</u> --- retain 1 month of weekly snapshots
* <u>Monthly</u> --- retain 1 year of monthly snapshots

Please email [DARC](mailto:gsb_darcresearch@stanford.edu) for help recovering files from snapshots.

