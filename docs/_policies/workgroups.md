# Workgroup Management
## What is a Workgroup?

The [Stanford Workgroup Manager](https://workgroup.stanford.edu/) is a web interface that gives Stanford community members a place to define a group of other community members based on their SUNet IDs for use in various applications. A workgroup is given a name that uniquely identifies it and succintly describes its purpose. Relevant to the Yens, the Workgroup Manager helps control access to individual [project space](/services/newProject.html) on ZFS (ex: `gsb-rc:[faculty-SUNet]-[projectname]`).

## Adding/Removing Users to your Workgroup
If you are an Administrator of a workgroup, you can use the Workgroup Manager interface to easily add users to and remove users from that workgroup. Adding users to a workgroup immediately grants them permissions to whatever resource that workgroup controls access to. Likewise, removing users revokes those permissions. You might want to do this if you no longer want someone to have access to your project space or as part of regular auditing of external collaborators you have sponsored access to the Yens for.

Users can be added as Members and/or Administrators of a workgroup. While Members are simply granted permission to the resource controlled by the workgroup, Administrators have the power to add *other* users as Members/Administrators to the workgroup.

!!! warning
    Given that Administrators of a workgroup have the power to add other users, please be mindful of who you grant Administrator privileges to. It is *your responsibility* to audit both the Administrators and Members of your workgroup.


For instructions on how to perform these operations, use this [helpful page](https://uit.stanford.edu/service/workgroup/add-remove-members) created by Stanford UIT that illustrates these processes with screenshots.

## Other Page
### How Do I Add a Collaborator to my Yen Project Space?
Adding (and removing) members to your project space is self-service for project administrators.  All you have to do is add a collaborator to the Workgroup that is tied to the project.

!!! tip 
     If your collaborator is new to the Yens, you can learn how to sponsor them [here](/yen/Collaborators.html).

!!! important.html
    Full SUNet ID sponsorship is required for access to [JupyterHub](/yen/webBasedCompute.html).

Your workgroup should have a name that is clear from the name of your project space.  For example, if your project is stored at `/zfs/projects/faculty/jdoe-housing`, there will be a workgroup called `gsb-rc:jdoe-housing`.

Faculty and students should use the [workgroup manager](https://workgroup.stanford.edu) to add members, and optionally, administrators to their projects.  This is the same system used for [yen access](/_policies/collaborators).  For step-by-step instructions on how to use the workgroup manager, see our [workgroup guide](/yen/workgroups.html).
