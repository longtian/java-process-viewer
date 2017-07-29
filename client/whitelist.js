module.exports = [
  'uptime',
  /^jcmd \d+ help$/,
  /^jcmd \d+ Thread\.print$/,
  /^jcmd \d+ VM\.(version|command_line|system_properties|flags|uptime)$/,
  /^jcmd \d+ GC\.(class_histogram|run|run_finalization)$/
];