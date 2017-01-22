### Usage

gulp [flags] [--] [task [task options] task [task options] ...]

### Tasks

Tasks can be executed by running `gulp <task> <othertask>`. Running `gulp` without specifying
any task will execute the task you registered called `default`. If there is no `default` task, gulp will error.

### Task Options

Following each task name, you can specify a list of options that are meant for the task, which gulp will ignore.

In order for gulp to ignore task options and figure out the task names, the convention will
be to consider any argument not start with `-` a task name.

### Flags

You can specify gulp's flags before the tasks.  gulp will detect the start of tasks, 
but you can specify `--` to explicitly indicate that.

**Some flags only work with gulp 4 and will be ignored when invoked against gulp 3.**

**--help**, **-h**
    Show the help.

**--version**, **-v**
    Print the global and local gulp versions.

**--require** [path]
    Will require a module before running the gulpfile. This is useful for transpilers but also has other applications.

**--gulpfile**, **-p** [path]
    Manually set path of gulpfile. Useful if you have multiple gulpfiles. This will set the CWD to the gulpfile directory as well.

**--cwd** [path]
    Manually set the CWD. The search for the gulpfile, as well as the relativity of all requires will be from here.

**--verify** [path (optional)]
    Will verify plugins referenced in project's package.json against the plugins blacklist.

**--tasks**, **-T**
    Print the task dependency tree for the loaded gulpfile.

**--tasks-simple**
    Print a plaintext list of tasks for the loaded gulpfile.

**--tasks-json** [path]
    Print the task dependency tree, in JSON format, for the loaded gulpfile. The [path] argument is optional, and if given writes the JSON to the path.

**--color**
    Will force gulp and gulp plugins to display colors, even when no color support is detected.

**--no-color**
    Will force gulp and gulp plugins to not display colors, even when color support is detected.

**--silent**, **-S**
    Suppress all gulp logging.

**--continue**
    Continue execution of tasks upon failure.

**--log-level**, **-L**
    Set the loglevel. -L for least verbose and -LLLL for most verbose. -LLL is default.

### Compilers

You can find a list of supported languages at https://github.com/js-cli/js-interpret. If you would like to add support for a new language, send pull requests/open issues on that project.

### Environment

The CLI adds process.env.INIT_CWD which is the original cwd it was launched from.
