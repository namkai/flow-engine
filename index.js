const FlowEngine = require('./flow_engine');

const data = require('./data.json');
const rules = require('./rules.json');
const flowEngine = new FlowEngine( data, rules );


flowEngine.start();
