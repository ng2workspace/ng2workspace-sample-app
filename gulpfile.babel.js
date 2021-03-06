'use strict';

import gulp from 'gulp';
import {ng2workspace} from 'ng2workspace';

(function setupWorkspace() {
  ng2workspace.configure({
    file_vendors: 'polyfills',
    html_title: 'Demo: ng2workspace - AngularClass clone',
    spec_entry: 'spec-bundle.js',
    env: {
      hello: 'hola'
    }
  });

  ng2workspace.add('webpack', {}, { webpack: 'bundle' });
  ng2workspace.add('webpack-assets');
  ng2workspace.add('webpack-index-html');
  ng2workspace.add('webpack-html');
  ng2workspace.add('webpack-css');
  ng2workspace.add('webpack-ts');
  ng2workspace.add('webpack-tslint', { failOnHint: false });
  ng2workspace.add(jsonSupport);
  ng2workspace.add('webpack-karma', { browsers: ['Chrome'] });

  ng2workspace.bootstrap(gulp);
})();

gulp.task('default', ['build']);
gulp.task('build', ['webpack/webpack']);
gulp.task('watch', ['webpack/webpack:watch']);

function jsonSupport(options, workspace) {
  var webpackConfig = workspace.get('webpack').webpackConfig;

  webpackConfig.resolve.extensions.push('.json');

  webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json-loader'
  });
}