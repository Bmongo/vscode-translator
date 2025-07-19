module.exports = {
  parserOpts: {
    headerPattern: /^(\w*): (\p{Emoji}\s*)?(.*)$/u,
    headerCorrespondence: ['type', 'emoji', 'subject'],
  },
}
