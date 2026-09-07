import Link from 'next/link';
import { baseClasses, classes, type Skill } from '../lib/data';
import { acquisition, number } from '../lib/codex';
import Icon from './Icon';

const EFFECT_LABEL: Record<string, string> = {
  'Daño físico': 'Daño físico', 'Daño mágico': 'Daño mágico', 'Daño periódico': 'Daño periódico',
};
export default function SkillCard({ skill, showClasses = false }: { skill: Skill; showClasses?: boolean }) {
  const users = classes.filter(c => c.skills.includes(skill.name));
  const roots = new Set(users.map(c => c.rootSlug));
  const magical = skill.slug === 'llama-hispana' || skill.slug === 'luz-de-numancia';
  return <article id={skill.slug} className={`skill-card ${magical ? 'skill-magic' : ''}`}>
    <div className="skill-heading"><span className="skill-icon"><Icon name={magical ? 'spark' : skill.slug === 'flecha-serrana' ? 'bow' : 'sword'} size={24} /></span><div><h3>{skill.name}</h3><p>{magical ? 'Magia' : 'Técnica física'} <span>·</span> {skill.target}</p></div><span className="level-badge">Nv. {skill.level}</span></div>
    <p className="skill-description">{skill.description}</p>
    <dl className="skill-metrics"><div><dt>Maná</dt><dd>{number(skill.manaCost)} <small>MP</small></dd></div><div><dt>Recarga</dt><dd>{number(skill.cooldown)} <small>s</small></dd></div><div><dt>Alcance</dt><dd>{number(skill.range)} <small>m</small></dd></div></dl>
    <details className="skill-details"><summary>Cómo funciona <span aria-hidden="true">+</span></summary><div className="skill-expanded"><dl className="detail-pairs"><div><dt>Lanzamiento</dt><dd>{skill.castTime === 0 ? 'Instantáneo' : `${number(skill.castTime)} s`}</dd></div><div><dt>Se obtiene</dt><dd>{acquisition(skill)}</dd></div>{skill.healthCost > 0 && <div><dt>Coste de vida</dt><dd>{number(skill.healthCost)}</dd></div>}{skill.radius > 0 && <div><dt>Radio de efecto</dt><dd>{number(skill.radius)} m</dd></div>}</dl>{skill.effects.length ? <div className="effect-list">{skill.effects.map((effect, i) => <p key={i}><strong>{EFFECT_LABEL[effect.type] ?? effect.type}</strong><span>Potencia ×{number(effect.magnitude)}{effect.duration > 0 ? ` · ${number(effect.duration)} s` : ''}{effect.tick > 0 ? ` · cada ${number(effect.tick)} s` : ''}</span></p>)}</div> : <p className="data-note">No hay un desglose de efectos publicado para esta habilidad.</p>}</div></details>
    {showClasses && <div className="skill-users"><p>Disponible en {users.length} profesiones</p><div>{baseClasses.filter(c => roots.has(c.slug)).map(c => {
      const hasSkill = c.skills.includes(skill.name);
      const representative = hasSkill ? c : users.filter(user => user.rootSlug === c.slug).sort((a, b) => a.tier - b.tier)[0];
      return representative ? <Link key={c.slug} href={`/clases/${representative.slug}`}>{hasSkill ? c.name : `${c.name} · ${representative.name}`}</Link> : null;
    })}</div>{users.some(c => c.rootSlug === 'montaraz') && skill.slug === 'llama-hispana' && <small>Montaraz: rama de Acechador.</small>}</div>}
  </article>;
}
