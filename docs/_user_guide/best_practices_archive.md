## Why Should I Archive?

When your project is nearing completion and you have finished running computations on the yens, what is left to do is:

- Clean up files you no longer need.
- Compress files with `zip` or `gunzip` command.
- Bundle all the files together with the `tar` command.
- Transfer the tarball off of yens.
- Remove your project directory.

Archiving data will save disk space on the yens as well as make it easy for you to transfer your full project as one big file.

!!!warning
    The yens are not meant for long-term archiving of files and past projects. You should figure out where you want to archive your projects or talk to the DARC team. Possible long-term and affordable solutions include [Google Drive](https://uit.stanford.edu/service/gsuite/drive){:target="_blank"}, [AWS Glacier](https://aws.amazon.com/glacier/){:target="_blank"}, or [GitLab](https://code.stanford.edu/){:target="_blank"}. You can store the archived files there and move them off of yens.

!!!Important
    Make sure you know the risk classification of [the data you have on the Yens](/_policies/security){:target="_blank"}. Some high-risk data cannot be transferred off of the Yens to the cloud, for example.

## How Do I Archive?

### Compressing Project Directory On Yen Servers
Once you are done cleaning intermediate files and other junk from your project directory, you can compress the entire directory into one tarball that you can then push to Google Drive (with [rclone](/_blog/2023-09-18-rclone){:target="_blank"}) or other remote storage.

If I have my project directory in `/zfs/projects/faculty/my-project-dir`, I would navigate to the parent directory above the directory I want to archive, then run:

```bash
$ cd /zfs/projects/faculty
$ tar -zcvf my-project-name.tar.gz my-project-dir
```
where `-z` flag will compress the files inside `my-project-dir` directory and create a new tar object `my-project-name.tar.gz` in `/zfs/projects/faculty` directory. 

### Transferring to Your Archive
After choosing the long-term storage solution, transfer the tarball into it for the long-term storage and delete the project directory and the tarball off of yens.
