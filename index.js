const FlowEngine = require('./flow_engine');

const data = require('./data.json');
const rules = require('./rules.json');
//const parsedRules = rules.map(JSON.parse);
//console.log(data, `i'm the data!`)
//console.log(parsedRules, `i'm the rules!`)


//const data = {
//  color: 'red',
//};

const flowEngine = new FlowEngine( data, rules );

flowEngine.addRule({
  title: 'Check if type is number',
  id: 5,
  body: (data) => typeof data.color === 'number',
  true_id: 5,
  false_id: 6,
});


flowEngine.start();
