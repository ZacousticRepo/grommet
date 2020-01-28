import gulp from 'gulp';

import grommetToolbox from 'grommet-toolbox';

import gulpDist from './gulpfile-grommet-dist';
import gulpRelease from './gulpfile-grommet-release';

grommetToolbox(gulp);

gulpDist(gulp);

