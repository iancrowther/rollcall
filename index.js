var github = require('github')
var async = require('async')
var _ = require('lodash')
var fs = require('fs')
var argh = require('argh').argv
var config = require('./github.credentials')

var gh = new github({
  version: "3.0.0",
  debug: false,
  protocol: "https",
  timeout: 5000,
  headers: {
    "user-agent": "nodeschool-international-day"
  }
})

gh.authenticate({
  type: 'token',
  token: config.token
})

var rollcall = {
  name: 'International Day ' + argh.year + ' - Rollcall',
  attendees: []
}

console.log('creating rollcall-' + argh.year + '.json')

gh.issues.repoIssues({
  user: config.user,
  repo: config.repo,
  labels: 'rollcall-' + argh.year,
  state: 'all'
}, function(err, issues) {
  if (err) console.error(err)

  async.each(issues, function(issue, cb){
    gh.issues.getComments({
      user: config.user,
      repo: config.repo,
      number: issue.number
    }, function(err, comments){
      if (err) console.error(err)

      comments.forEach(function(comment) {
        rollcall.attendees.push(comment.user.login)
      })
      cb(null)
    })
  }, function(err) {
    if (err) console.error(err)

    rollcall.attendees = _.uniq(rollcall.attendees);

    fs.writeFile('rollcall-' + argh.year + '.json', JSON.stringify(rollcall, null, 2), function (err) {
      if (err) console.error(err)
      console.log('done')
    });
  })
})
