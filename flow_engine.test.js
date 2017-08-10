const FlowEngine = require('./flow_engine');
const expect = require('chai').expect;
const data = require('./data.json');
const rules = require('./rules.json');
const sinon = require('sinon');

describe('FlowEngine Class', () => {
  let spy = sinon.spy(console, 'log');
  describe('Start Function', () => {
    const flowEngine = new FlowEngine(data);
    it('should be a function', () => {
      expect(flowEngine.start).to.be.a('function');
    });
    it('should return "There are no rules to run" if rules.length === 0', () => {
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
  describe('getRule Function', () => {
    const flowEngine = new FlowEngine(data, rules);
    it('should be a function', () => {
      expect(flowEngine.getRule).to.be.a('function');
    });
    it('should return the rule searched by ID', () => {
      expect(flowEngine.getRule(1).title).to.equal('Check if Red');
    });
  });
  describe('runRuleFunction', () => {
    const flowEngine = new FlowEngine(data, rules);
    it('should be a function', () => {
      expect(flowEngine.runRuleFunction).to.be.a('function');
    });
    it('If rule doesnt exist, console.log End', () => {
      flowEngine.runRuleFunction(8);
      expect(spy.calledWith('End')).to.be.true;
      spy.restore();
    });
  });
  describe('checkRule Function', () => {
    const flowEngine = new FlowEngine(data, rules);
    it('should be a function', () => {
      expect(flowEngine.runRuleFunction).to.be.a('function');
    });
    it('should return object with nextRuleId === undefined', () => {
      expect(flowEngine.checkRule(6).nextRuleId).to.equal(null);
    });
    it('should have nextRuleId be equal to true_id if rule.body returns true', () => {
      expect(flowEngine.checkRule(1).nextRuleId).to.equal(flowEngine.rules[1 - 1].true_id);
    });
    it('should have nextRuleId to be equal to false_id if rule.body returns false', () => {
      expect(flowEngine.checkRule(3).nextRuleId).to.equal(flowEngine.rules[1].false_id);
    });
  });
});