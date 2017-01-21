# gulp-clap

This is a fork of [gulp-cli] because I don't `"grasp *nix command line argument parsing"`.

> __NixClap__: `"*nix Command Line Argument Parsing"`
 
According to certain extensively researched __NixClap__ knowledge, some \*nix commands I've been
using for __decades__ are parsing arguments wrong.

Like `grep --no-filename foo. --fixed-strings file`

In the above command, according to __NixClap__, `grep` should've considered `foo.` an argument
for the option `--no-filename`, and `file` for `--fixed-strings`, but it's not.  Well, dang, whoever
wrote grep, you need to work on your understanding of __NixClap__.  Your saving grace is at least
the man page documented these quite thoroughly.

But wait, it gets better.  Certain __NixClap__ also doesn't treat `foo.` as an argument 
for `--no-filename`, but only that one.  Apparently there's something magical 
to `--no-filename`, like maybe that [`no-`] prefix in there?  It's beyond me because I 
lack understanding of how it works.

But really, my goal is to be able to pass options to tasks verbatim, and let tasks parse them 
according to their __NixClap__ knowledge.  And of course, document the semantics thoroughly, 
rather than tell users to bugger off or go to [Stack Overflow], or throw the __NixClap__ card.
Then again, certain extensively researched __NixClap__ have no concept of the difference between
syntax and semantics.

## Install

```bash
$ npm install -g gulp-clap
```

## Usage

```bash
$ gulp [flags] [--] [task [task options] task [task options] ...]
```

### Flags

See `gulp --help`

__Some flags only work with gulp 4 and will be ignored when invoked against gulp 3.__

[gulp-clap] will detect the end of flags for it and the start of tasks, but you can 
also use the optional indicator `--` to explicitly mark the start of tasks.

### Tasks

Tasks can be executed by running `gulp <task> <othertask>`. Running `gulp` without specifying
any task will execute the task you registered called `default`. If there is no `default` task, gulp will error.

### Task Options

Following each task name, you can specify a list of options that are meant for the task.

In order for [gulp-clap] to ignore task options and figure out the task names, the convention will
be to consider any argument not start with `-` a task name.  This is chosen because there's no way 
for [gulp-clap] to know if a task option should take the next non-option argument
as a value or not, so the convention is to assume that no task option does that.

This makes everything simpler and you can do:

```bash
$ gulp task_a --boolean_a task_b --boolean_b
```

instead of

```bash
$ gulp task_a --boolean_a=true task_b --boolean_b=true
```

If you have a task option that wants to take a value, then use the convention 

```
--option=value
```

instead of 

```
--option value
```

#### Considerations

This convention is chosen so the following are possible. 

  - Obviously, be able to pass options to tasks verbatim, so things like these are possible:
     - Invoke `task_a` with `gulp task_a --help`
     - Use a long established convention that POSIX commands use `--` to indicate pass thru options.
  - Easy for tasks to separate their options from other tasks when being invoked at the same time.

#### Quirks

This convention means that task names can't start with `-`.  I can introduce some other convention to allow
that, but I think it's best if task names don't start with `-`. 

#### Extracting Options For A Task

With the above convention, now it's relatively easy to extract only options that are meant for your task.

```js
gulp.task('clap', function (done) {
  var i;
  var j;
  var argv = process.argv;
  for (i = j = argv.indexOf('clap') + 1;
       j < argv.length && argv[j].startsWith('-'); j++) {
  }
  var clapArgs = argv.slice(i, j);
  var opts = yargs.usage(usage, options).parse(clapArgs);
  // use opts
  done();
});
```

## Custom Metadata

When listing tasks with the `gulp -T` command, gulp-clap displays some custom metadata as defined upon task functions. Currently supported properties:

* `task.description` - String of the description to display.

```js
function clean() { ... }
clean.description = 'Cleans up generated files.';
```

* `task.flags` - Object with key/value pairs being flag/description to display.

```js
function build() { ... }
build.flags = {
  '--prod': 'Builds in production mode.'
};
```

Example Usage:

```js
function build() { ... }
build.description = 'Build entire project.';
build.flags = {
  '--prod': 'Builds in production mode (minification, etc).'
};
// gulp 3.x
gulp.task('build', build);
// gulp 4.x
gulp.task(build);
```

## Completion
> Thanks to the grunt team, specifically Tyler Kellen

To enable tasks auto-completion in shell you should add `eval "$(gulp --completion=shell)"` in your `.shellrc` file.

###### Bash:

Add `eval "$(gulp --completion=bash)"` to `~/.bashrc`.

###### Zsh:

Add `eval "$(gulp --completion=zsh)"` to `~/.zshrc`.

###### Powershell:

Add `Invoke-Expression ((gulp --completion=powershell) -join [System.Environment]::NewLine)` to `$PROFILE`.

###### Fish:

Add `gulp --completion=fish | source` to `~/.config/fish/config.fish`.

## Compilers

You can find a list of supported languages at https://github.com/js-cli/js-interpret. If you would like to add support for a new language, send pull requests/open issues on that project.

## Environment

The CLI adds process.env.INIT_CWD which is the original cwd it was launched from.

## Configuration

Configuration is supported through the use of a `.gulp.*` file (e.g. `.gulp.json`, `.gulp.yml`). You can find a list of supported languages at https://github.com/js-cli/js-interpret.

Configuration from the home directory (`~`) and current working directory (`cwd`) are merged with `cwd` taking precedence.

Supported configurations properties:

| Property    | Description |
|-------------|-------------|
| description | Top-level description of the project/gulpfile (Replaces "Tasks for ~/path/of/gulpfile.js") |

## License

MIT

[`no-`]: https://github.com/yargs/yargs/tree/bd1472ba3da6a6cbae521559b9c662416d1bac12#negate-fields
[gulp-cli]: https://github.com/gulpjs/gulp-cli
[gulp-clap]: https://github.com/jchip/gulp-clap
[Stack Overflow]: http://stackoverflow.com/