# Performance Tuning on the Yens

As you port your code from a local machine to the yen servers, you may notice some differences in performance.  Because of the design of our shared architecture, you may need to write your code in a different way to most effectively utilize the resources.

## Avoid excessive disk writes

One of the slowest things you can do is write data to disk.  On the yens in particular, our storage architecture is often shared across systems, and can be much slower than writing to a local SSD drive.

* Batch your disk writes when possible
* Avoid writing large numbers of individual files, particularly in the same directory
* Use a database (e.g., SQLite) if you find yourself outgrowing the file system

## Save your progress

It's very easy for code to crash unexpectedly when unhandled exceptions arise.  Whenever possible, design your code so that you don't have to start from scratch.  Keep track of your progress, save intermediate results, and log your output.

## RAM is fast

Reads from memory are usually very fast, and there is a lot of memory on the yens (in the terabyte range).  You can often scale up significantly in memory from your local machine, analyzing much more data at once on a single yen.  Make sure you understand the memory footprint of your code (if a machine runs out of RAM it will crash), but whenever possible try to capitalize on this resource.

## Leverage multiple processors

One of the biggest advantage of the Yens is the parallel processing that's available.  Each processor in itself might not be the fastest, but you have access to a lot of them, so scaling "out" is a good way to increase your performance.

* Design your code so that it can be "pleasingly parallel" and chunks can be run independently
* Use the tools in your particular software suite for parallelization, but know that they aren't all created equally
* There is overhead in doing things in parallel.  You may have to tune where in your pipeline things happen in parallel for things to work quickly.  If you have 10 tasks that each run for an hour, there's a lot less overhead than 36,000 tasks that each run for one second.

## Use the right libraries

For a lot of numerical methods, there are specific libraries that are significantly faster than the "base" libraries.  Both Intel and Microsoft have optimized libraries that may be a lot faster for certain tasks - if you are about to embark on a large numerical problem, it's worth testing to see if there are faster libraries available.

## Profile your code

Many languages have libraries that make it easy to profile your code, that is, to return the timing for each step.  If you can identify which specific part of your code is causing performance issues, that can help you target the underlying problem.

## Understand when resources are allocated or shared

Sometimes the yens will be heavily used, and CPU in particular may be heavily used on a particular machine.  JupyterHub and the interactive yens are both entirely shared resources - if lots of users are running code, the CPUs will have to be shared among those users.  Don't forget to check system usage if a machine seems slow, and be a good citizen in case *you're* the one slowing things down!

If you need dedicated resources, you can use submit your jobs using Slurm, and they will run on the scheduled resources.  You will have exclusive access to the resources you've requested, but you may have to wait for those resources to become available.  It's a good idea to prototype your code interactively first, and once you understand your resource needs, submit your jobs in batch.

## Shell commands are fast

If you're doing anything shaped like a pipeline, learning how to use basic Linux utilities can be incredibly fast.  Here are a few useful things that you can do on the command line that you might not have considered:

* `grep` to do a regular expression search in a file
* `head` and `tail` to extract segments from a file
* `wc` to get the length of a file
* `cut` to extract a subset of columns from a delimited file
* `sort` to sort the contents of a stream

They can be *combined* to make fast, powerful commands.  This command answers the question "How many rows have `int` in them in the fourth column of schema.csv?"

```bash
cut schema.csv -d ',' -f 4 | grep "int" | wc -l
```