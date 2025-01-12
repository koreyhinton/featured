# Featured

This featured repository is a container for end-to-end (selenium grid webdriver) test harnesses (currently
it is configured to test features for the act.svg diagram tool).

## snapshot mode

By default the tests will run in snapshot mode, which ensures your feature tests only assert correctly in the specified versions.

## installation

```sh
ns-clone ft git@github.com:koreyhinton/featured
```

## run tests

Act.svg example.

```sh

# on one shell, run the http server:
cd act.svg/sut
python3 -m http.server

# on another shell, run the tests
# with option variables (or use the default):
#     ft_harness=act.svg # (default)
#     ft_snap=1  # (default) with snapshot testing
#     ft_snap=0  # without snapshot testing
ft_version=v0.4
ft-run
```

## legacy run

```sh
# legacy syntax to run if not cloned with ns-clone
export NS_PATH="${PWD}:${PWD}/act.svg/tests:${NS_PATH}"
ft_version=devbox ft_snap=0; . ns run run
ft_version=v0.0 ft_snap=0; . ns run run
ft_version=v0.1 ft_snap=0; . ns run run
ft_version=v0.2 ft_snap=0; . ns run run
ft_version=v0.4 ft_snap=0; . ns run run

# on another shell run:
cd act.svg/sut
python3 -m http.server
```

## selenium server notes

When sending requests, the api gives vague errors if you don't do the following:
- give a body, even if one isn't needed, just use an empty one, ie: `curl -d '{}' ...`
- ensure there are no trailing commas (ie, remove this comma: `"actions" [ {...}, ]`)
- if the json attributes aren't working, then start from no attributes to get specific error
  messages of an attribute it expects


## featured tests

2 new scripts to help with snapshot/version featured tests.

- version-assert will ensure it passes the test if it was featured in that version
- version-between checks the current sut version so the test code can decide to run or not run on a particular version

```sh
. ns run version-assert  # inputs: ft_harness ft_start ft_end ft_assert
                         # outputs: ft_harness ft_start ft_end ft_assert ft_status ft_sut_v
. ns run version-between # inputs: ft_harness ft_start ft_end
                         # outputs: ft_harness ft_start ft_end ft_found
```
