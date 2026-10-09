const stages = [...document.querySelectorAll('.stage')];
const connectors = [...document.querySelectorAll('.connector')];
const runBtn = document.getElementById('runBtn');
const logs = document.getElementById('logs');
const logMessages = [
  ['INFO','Commit detectado en rama main'],
  ['PASS','Pipeline CI iniciado en GitLab Runner'],
  ['PASS','Build y lint finalizados sin errores'],
  ['PASS','Tests automatizados aprobados · 186/186'],
  ['PASS','SAST/SCA completado · sin bloqueos críticos'],
  ['PASS','Imagen versionada y publicada en registry'],
  ['PASS','Staging validado · smoke tests correctos'],
  ['PASS','Aprobación recibida · despliegue en producción']
];
let running = false;
function addLog(type, message) {
  const now = new Date().toLocaleTimeString('es-CL', {hour12:false});
  const row = document.createElement('div');
  row.innerHTML = `<time>${now}</time><b class="${type==='PASS'?'log-ok':'log-info'}">[${type}]</b><span></span>`;
  row.querySelector('span').textContent = message;
  logs.prepend(row);
  while (logs.children.length > 7) logs.lastElementChild.remove();
}
function resetPipeline() {
  stages.forEach((s,i)=>{s.className='stage';s.querySelector('.stage-state').textContent='PENDIENTE';});
  connectors.forEach(c=>c.classList.remove('active'));
  document.getElementById('stageCount').innerHTML='00 <i>/ 08</i>';
  document.getElementById('quality').textContent='RUNNING';
  document.getElementById('quality').className='';
  document.getElementById('prodStatus').textContent='WAITING';
  document.getElementById('prodStatus').className='';
}
runBtn.addEventListener('click', async()=>{
  if(running) return;
  running=true;runBtn.disabled=true;runBtn.textContent='◌ EJECUTANDO...';resetPipeline();
  for(let i=0;i<stages.length;i++){
    stages[i].classList.add('running');
    stages[i].querySelector('.stage-state').textContent='EN PROCESO...';
    addLog('INFO',logMessages[i][1]);
    await new Promise(r=>setTimeout(r,650));
    stages[i].classList.remove('running');stages[i].classList.add('done');
    stages[i].querySelector('.stage-state').textContent=i===7?'HEALTHY ✓':'COMPLETADO ✓';
    connectors[i]?.classList.add('active');
    document.getElementById('stageCount').innerHTML=String(i+1).padStart(2,'0')+' <i>/ 08</i>';
    if(i===4){document.getElementById('quality').textContent='PASSED';document.getElementById('quality').className='green';}
    if(i===7){document.getElementById('prodStatus').textContent='HEALTHY';document.getElementById('prodStatus').className='green';}
  }
  document.getElementById('pipelineId').textContent='#'+(8422+Math.floor(Math.random()*500));
  addLog('PASS','Pipeline finalizado correctamente · release desplegado');
  runBtn.disabled=false;runBtn.textContent='↻ VOLVER A EJECUTAR';running=false;
});
function tick(){document.getElementById('clock').textContent=new Date().toLocaleTimeString('es-CL',{hour12:false});}
tick();setInterval(tick,1000);