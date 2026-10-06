const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../math-ink.html'),'utf8');
const source=html.split('/* TUTOR_CORE_START')[1].split('/* TUTOR_CORE_END */')[0];
const M=vm.runInNewContext('/* TUTOR_CORE_START'+source+'\nTutorMath');
const equivalent=(a,b)=>M.equivalent(M.equation(a),M.equation(b));
test('fraction coefficients, decimals, parentheses, and signs are exact',()=>{
 assert.equal(M.fmt(M.parse('16 - 3p - 2/3p').a),'-11/3');
 assert.equal(M.fmt(M.constant('0.1+0.2')),'3/10');
 assert.equal(M.fmt(M.constant('-11 * (-3/11)')),'3');
 assert.equal(M.fmt(M.parse('-4(2x-3)').b),'12');
 assert.equal(M.fmt(M.parse('\\frac{2}{3}p').a),'2/3');
 assert.equal(M.fmt(M.constant('\\frac{1}{\\frac{2}{3}}')),'3/2');
});
test('equation checks preserve solution sets, including identities and contradictions',()=>{
 assert.ok(equivalent('16-3p=2/3p+5','16-11/3p=5'));
 assert.ok(equivalent('16-11/3p=5','-11/3p=-11'));
 assert.ok(equivalent('-11/3p=-11','p=3'));
 assert.ok(!equivalent('2x=4','x=-2'));
 assert.ok(!equivalent('x=3','0=0'));
 assert.ok(!equivalent('x=x','0=1'));
 assert.ok(!equivalent('x=3','p=3'));
 assert.ok(equivalent('x=x','0=0'));
 assert.ok(equivalent('x=x+1','0=2'));
});
test('both sides must match the selected operation, not just share a solution',()=>{
 const l=M.operation('2x+5','5','-'),r=M.operation('9','5','-');
 assert.ok(M.same(l,M.parse('2x')));assert.ok(M.same(r,M.parse('4')));
 assert.ok(!M.same(l,M.parse('x')));assert.ok(!M.same(r,M.parse('2')));
 assert.ok(M.same(M.operation('5','5','-'),M.parse('0')));
});
test('unsupported or invalid math fails explicitly',()=>{
 for(const s of ['1/0','x/x','x*x','x^2','2x+y','alert(1)','2+','(2','2)','2=3','NaN','1e3',''])assert.throws(()=>M.parse(s),s);
 assert.throws(()=>M.equation('x=2=3'));
 assert.throws(()=>M.constant('x-x+2'));
});
test('signs, nested fractions, and numerical powers',()=>{
 assert.equal(M.fmt(M.constant('-2^2')),'-4');
 assert.equal(M.fmt(M.constant('(-2)^2')),'4');
 assert.equal(M.fmt(M.constant('1/(2/3)')),'3/2');
 assert.equal(M.fmt(M.parse('1/5 r').a),'1/5');
 assert.equal(M.fmt(M.parse('2(x+1)/3').a),'2/3');
});
test('coefficient notation renders the same meaning that the checker uses',()=>{
 const converter=html.slice(html.indexOf('const WORDS ='),html.indexOf('/* ---------- do-the-same-to-both-sides'));
 const toLatex=vm.runInNewContext(converter+'\ntoLatex');
 assert.equal(toLatex('2/3p'),'\\frac{2}{3}p');
 assert.equal(toLatex('16-11/3p=5'),'16-\\frac{11}{3}p=5');
 assert.equal(toLatex('2/(3p)'),'\\frac{2}{3p}');
});

test('paper arithmetic accepts the requested independent side results',()=>{
 const start=M.equation('7=12');
 const left=M.operation(start.sides[0],'6','-');
 const right=M.operation(start.sides[1],'6','-');
 assert.ok(M.same(left,M.parse('1')));
 assert.ok(M.same(right,M.parse('6')));
 assert.ok(M.same(M.operation('5','5','-'),M.parse('0')));
});

test('Tutor Mode keeps visible answer marks and contextual helpers',()=>{
 for(const id of ['leftMark','rightMark','fractionCoach','reciprocalCoach','pendingReciprocal']){
   assert.match(html,new RegExp(`id="${id}"`));
 }
 assert.match(html,/history-answer/);
 assert.match(html,/correct and marked ✓/i);
});

test('typed Return stays in the equation workflow',()=>{
 assert.match(html,/function keepEquationWorkflowInView/);
 assert.match(html,/\$\('opval'\)\.focus\(\{preventScroll:true\}\)/);
 assert.match(html,/if\(tutorOn\(\)\) keepEquationWorkflowInView\(\); else keepInView\(\);/);
 assert.match(html,/function applyLayout\(mode\) \{[\s\S]*?resize\(\); renderSheet\(\);\n\}/);
 assert.doesNotMatch(html,/\$\('tutorPanel'\)\.scrollIntoView/);
});

test('step classification separates simplification from equivalence',()=>{
 const numeric=M.classifyStep(M.equation('7 - 6 = 12 - 6'),M.equation('1 = 6'));
 assert.equal(numeric.kind,'simplification');
 assert.equal(numeric.truth,'false');
 assert.equal(M.classifyStep(M.equation('3x + 5 = 17'),M.equation('3x = 12')).kind,'equivalent');
 assert.equal(M.classifyStep(M.equation('16 - 3p = 2/3p + 5'),M.equation('16 - 11/3p = 5')).kind,'equivalent');
});

test('step classification coaches the side that breaks the transformation',()=>{
 assert.equal(M.classifyStep(M.equation('3x + 5 = 17'),M.equation('3x = 22')).kind,'incorrect-right');
 assert.equal(M.classifyStep(M.equation('3x + 5 = 17'),M.equation('3x + 5 = 12')).kind,'incorrect-operation-both-sides');
 assert.equal(M.classifyStep(M.equation('7 - 6 = 12 - 6'),M.equation('2 = 7')).kind,'equivalent');
});
