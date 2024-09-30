This is a guide for making edits to new RCpedia website, using `git` to push your changes and testing locally first to preview the changes.

Start by cloning the repo to your local directory:

```
git clone https://github.com/gsbdarc/rcpedia_mockup.git
```

Make a new feature branch and switch to it:

```bash
git checkout -b new-branch-name
```

Proceed to make changes. After you edit the page, preview in a local browser before committing the changes.

- Make `venv` that has the packages needed for website build:
```bash
cd rcpedia_mockup
python3 -m venv mkdocs
source mkdocs/bin/activate
pip install -r requirements.txt
```

- Build website:
```
mkdocs serve
```

- Navigate to `http://localhost:8000/` to view the website.

If changes look good, push the changes to your branch.

```
git add my_edited_page.md
git commit -m "good commit message"
git push
```

Lastly, make a PR to `QA` branch to merge your feature branch into `QA`. 

After your PR is approved by a team member, merge the PR and view the results at `https://rcpedia-dev.stanford.edu`.