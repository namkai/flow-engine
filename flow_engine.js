class FlowEngine {
  constructor(flowObject = {}, rules = []) {
    this.flowObject = flowObject;
    this.rules = rules;
  }
  
  checkRule(id) {
    // Gets the current rule by it's ID, if undefined returns object with nextRuleId = null
    // Creates variable ruleFunction which evauluates the flowObject
    // If it returns true, assign nextRuleId to true_id
    // If it returns false, assign nextRuleId to false_id
    let currentRule = this.getRule(id);
    if (currentRule === undefined) {
      return { nextRuleId: null };
    }
    let ruleFunction = eval(currentRule.body);
    if (ruleFunction(this.flowObject)) {
      console.log('\x1b[32m', `Rule: ${currentRule.title} has passed`);
      currentRule.nextRuleId = currentRule.true_id;
    } else {
      console.log('\x1b[31m', `Rule: ${currentRule.title} has failed`);
      currentRule.nextRuleId = currentRule.false_id;
    }
    return currentRule;
  }
  
  addRule(newRule) {
    // Adds a new rule to the rules array
    this.rules.push(newRule);
  }
  
  runRuleFunction(id) {
    // If nextRuleId exists run the next rule, else reached end of rules to run
    let rule = this.checkRule(id);
    console.log(`i'm the rule!`, rule)
    rule.nextRuleId ? this.runRuleFunction(rule.nextRuleId) : console.log('\x1b[35m', 'End');
  }
  
  getRule(id) {
    // Returns the rule with the matching id
    return this.rules[this.rules.findIndex(i => i.id === id)];
  }
  
  start() {
    // Runs the first rule in the rules array but checks first to make sure there are rules to run.
    this.rules.length === 0 ? console.log('There are no rules to run') : this.runRuleFunction(this.rules[0].id);
  }
}

module.exports = FlowEngine;

