# Featured

This featured repository is a container for end-to-end (nightwatchjs) test harnesses (currently
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
ft_version=c702432
ft-run
```
