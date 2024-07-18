# File Storage

You have several options for where to store your research files (data sets, programs, output files, and so forth). This guide will help you decide which storage location is best for your situation.

## Yen Storage: ZFS

!!! danger "Data Risk Levels"
    The Yen servers are *not* approved for high risk data. Moderate and low risk data are both approved on the Yens.

The GSB has nearly 1 PB of high-performance storage available from the yen servers under the path ```/zfs```. Currently all yen user directories (``` ~/```) reside on ZFS. In addition to user home directories, Stanford GSB faculty (and in some cases students, see below), may [request additional project space]() on ZFS. 

!!! tip
    ZFS is mounted only from the yen servers. You cannot access it from Sherlock, FarmShare or any other system

### Yen Home Directories

Home directories on the Yen servers are also stored on our storage system. Your home directory has a quota of 50 GB.

When you log into the Yen servers you will automatically land in your home directory, which is located at ```/home/users/{SUNet-id}``` or with the shortcut `~`.

### Faculty Project Space

All GSB faculty may request project space on ZFS and DARC will set up a corresponding Stanford workgroup that you may use to add and remove collaborators for your project. Quotas are set for faculty ZFS directories based on expected space requirements. However, we understand that initial space estimates may be insufficient and thus we can grant storage quota increases upon request later. But kindly do your part and be a good steward of the commons by

- Archiving projects or infrequently accessed files when you can (see [here]())
- Deleting intermediate files that you no longer need to use

### Student Project Space

While ZFS is primarily a resource for Stanford GSB faculty, under certain conditions Stanford GSB graduate students may also be granted project space in ZFS. If you feel you are in need of student project space on ZFS (as distinct from a faculty led project), you may also [request project space](). The default size for student project space is 200 GB but let us know if you need more space for your student project.

### Backups

Files on ZFS are backed up as "snapshots" and can be restored manually by system admins. We also maintain an off-site disaster recovery solution for both ZFS and home directories. To restore files, please reach out 


### Scratch Space 
There is a large ZFS based scratch space, accessible from any yen, at ```/scratch/shared```, which is 100 T in size. Reads and writes to this space are slower than to local disk.

## Yen Storage: Local Disk

On each Yen machine, there is local disk space mounted at ```/tmp```, which is over 1 T in size. Reading and writing from ```/tmp``` is a lot faster because I/O operations do not have to go via the slow network. All yen users are free to make use of this space. Much like a hard drive on your laptop, this can be accessed only from that single Yen machine. Be careful not to fill up `/tmp` completely as jobs running on that yen node may crash in unexpected ways. Be a good citizen and delete the files you no longer need. 

!!! note "Temporary space is temporary"

    Note that ```/scratch``` and ```/tmp``` space on all yens is cleared during system reboots, and is subject to intermittent purging as needed by the admins. Therefore local ```/tmp``` or ```/scratch``` spaces are best only for temporary files

## Checking Your Quota

To determine how much of your home directory quota you have used, you can simply type:
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

## TODO?
* Oak Storage
* Google Drive



Refs:
https://rcpedia.stanford.edu/storage/fileStorage.html
https://rcpedia.stanford.edu/faqs/howCheckDiskQuota.html
https://rcpedia.stanford.edu/faqs/howDoIGetZFSSpace.html
https://rcpedia.stanford.edu/faqs/howRecoverZFSFiles.html
https://rcpedia.stanford.edu/gettingStarted/6_filesystem.html