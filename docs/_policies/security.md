---
title: Security
order: 0
layout: indexPages/security
parent: None
subHeader: Data, Analytics, and Research Computing.
updateDate: 2024-06-05
---

# Security

Stanford is committed to protecting the privacy of its students, alumni, faculty, and staff, as well as protecting the confidentiality, integrity, and availability of information important to the University's mission.  

## Data Classification

The University provides a [simple categorization of data risk levels](http://dataclass.stanford.edu/) to clarify the safeguards needed when working with data of different types. The University has developed [minimum security standards](https://uit.stanford.edu/guide/securitystandards) for servers that are used for each of these types of data. Presently, the risk categorizations can be summarized as follows:

| Risk Type      | Simplified Description | Example
| ----------- | ----------- | -----------
| Low      | Public data       | SEC Filings
| Moderate   | Private data        | Stanford-licensed dataset
| High   | Protected data  | Medical insurance claims

<br>
It is **your** responsibility as a researcher to be a responsible steward of your data. If you're ever unsure the risk categorization of your data, please <A HREF="mailto:gsb_darcresearch@stanford.edu" target="_blank">contact us</A> to discuss how to best achieve your research goals while being mindful of data security.

{% include important.html content="The Yen servers are *not* approved for high risk data." %}

If you choose to use your own independent system (e.g., your own machine in the cloud), you are responsible for correctly managing any secure data and credentials necessary.


## Yen Servers

The Yen Servers are approved to handle Moderate Risk data. They are currently stored in a secure, centrally-managed data center on the Stanford Historical Campus. Consistent with minimum security standards, the Yen servers have the following security features:

* Required Single-Sign On with Multi Factor Authentication
* Centralized logging
* Patching and vulnerability scans

While the Yen Servers do protect data from unauthorized access, there are no mechanisms in place to control the export of data.


## Contractual Requirements

If you are using licensed data, the storage, processing, sharing and publication of this data may be limited by agreement with the data provider.  It is **your** responsibility to understand the limitations of use for your data, particularly in consideration of:

* collaborations outside of the GSB
* copying data to a new environment
* merging restricted data with other datasets
* leaving the GSB

If you have any questions or concerns about use of your restricted data, please <A HREF="mailto:gsb_darcresearch@stanford.edu" target="_blank">contact us</A> to discuss your specific situation.


## Managing Collaborators

On the Yens, a shared project space is provisioned for each new project and has a faculty owner, as well as collaborators who can access the shared space. Each project space is assigned a project space workgroup (`gsb-rc:[faculty-SUNet]-[projectname]`).

Adding (and removing) users to your shared project space is self-service and can be managed as described [here](/yen/workgroups.html). For GSB faculty members, adding [collaborators external to the GSB](/yen/Collaborators.html) to your workgroup also grants those people access to the Yens.

Note that it is **your** responsibility to ensure the correct researchers are listed in your project workgroup, that they have the appropriate role (Member or Administrator, discussed [here](/yen/workgroups.html)), *and* that they have taken the necessary steps to use any data in your project.

## Information Security

No matter how secure our research computing servers are, if your own computer is compromised, it compromises the security of our environment.

{% include tip.html content="Stanford's Information Security Office has a [full site](https://uit.stanford.edu/security) to help protect your data and devices." %}
