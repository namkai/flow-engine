const FlowEngine = require('./flow_engine');
const expect = require('chai').expect;
const data = require('./data.json');
const rules = require('./rules.json');
const sinon = require('sinon');

describe('FlowEngine Class', () => {
  describe('Start Function', () => {
    const flowEngine = new FlowEngine(data);
    it('should return "There are no rules to run" if rules.length === 0', () => {
      let spy = sinon.spy(console, 'log');
      flowEngine.start();
      expect(spy.calledWith('There are no rules to run')).to.be.true;
      spy.restore();
    });
    
  });
  describe('addRule Function', () => {
    const flowEngine = new FlowEngine(data, rules);
    it('should be a function', () => {
      expect(flowEngine.addRule).to.be.a('function');
    });
    it('should add a rule to flowEngine', () => {
      const testRule = {
        title: 'Check if type is number',
        id: 5,
        body: (data) => typeof data.color === 'number',
        true_id: 5,
        false_id: 6,
      };
      flowEngine.addRule(testRule);
      expect(flowEngine.rules.length).to.equal(3);
    });
  });
});