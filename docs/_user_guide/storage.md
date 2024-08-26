# Storage Solutions

At Stanford's Graduate School of Business, we have several storage options available to us; let's evaluate which option is right for your research.  Several factors determine the proper storage solution, including size, security, access restrictions, and compute. Below, we will briefly discuss each storage option. For more details, please refer to [this page](/storage/fileStorage.html).

{% include warning.html content="Before transferring data to any platform, make sure the data is licensed for your use and that the storage platform meets the security requirements for that data." %}

## Preferred Platforms:
- **ZFS:** The GSB's 612 TB high-performance storage solution. Currently, all Yen user and project directories reside on ZFS. Snapshots are taken of the data and are easily recoverable. ZFS is the ideal solution if you are performing your analysis or computational work on the Yens.
- **Google Drive:** Available to all users at Stanford. [Approved](https://uit.stanford.edu/service/gsuite/drive) for low, medium and high risk data. Limited to 400,000 files and throttled to 750 GB upload per day. Ideal for audio, video, PDFs, Images, and flat files. Great for sharing with external collaborators. Also appropriate for [archiving research data](../faqs/rcloneGoogleDrive.html)
 - **Oak:** Similar to ZFS, "[Oak](https://uit.stanford.edu/service/oak-storage) is a High-Performance Computing (HPC) storage system available to research groups and projects at Stanford for research data." Oak is not snapshotted; deleted data is lost. It costs about $45 per 10 TB. If you expect to use [Sherlock](/training/14_sherlock_hpc.html), you will need to use Oak.
 - **Redivis:** [Redivis](https://redivis.com/) allows users to deploy datasets in a web-based environment (GCP backend) and provides a powerful query GUI for users who don't have a strong background in SQL. 

## Other Stanford Platforms

The following storage platforms are currently supported but users are discouraged from relying on them for continuing research:

 - **AFS:** [Andrew File System.](https://uit.stanford.edu/service/afs)
 - **Box:** [Box](https://uit.stanford.edu/service/box) Stanford provides basic document management and collaboration through Box.com. Box is an easy-to-use platform that you can log into with your Stanford credentials.
 
## Cloud Platforms

Storing data in the cloud is an effective way to inexpensively archive data, serve files publicly, and integrate with cloud-native query and compute tools. With the growing number of cloud storage options and security risks, we advise caution when choosing to store your data on any cloud platform. If you are considering cloud solutions for storage, please contact [DARC](http://darcrequest.stanford.edu) to discuss your needs.
