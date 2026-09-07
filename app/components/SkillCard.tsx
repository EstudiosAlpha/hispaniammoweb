import Link from 'next/link';
import { baseClasses, classes, type Skill } from '../lib/data';
import { acquisition, number } from '../lib/codex';
import GameIcon from './GameIcon';

export default function SkillCard({ skill, showClasses = false }: { skill: Skill; showClasses?: boolean }) {
  const users = classes.filter(c => c.skills.includes(skill.name));
  const roots = new Set(users.map(c => c.rootSlug));

  return (
    <article id={skill.slug} className="codex-record skill-record">
      <details>
        <summary>
          <GameIcon kind="skills" slug={skill.slug} />
          <span className="record-name">
            <strong>{skill.name}</strong>
            <span className="record-subtitle">{skill.description}</span>
          </span>
          <span className="record-facts">
            <span><small>Maná</small><b>{number(skill.manaCost)} MP</b></span>
            <span><small>Recarga</small><b>{number(skill.cooldown)} s</b></span>
            <span><small>Alcance</small><b>{number(skill.range)} m</b></span>
          </span>
          <span className="record-toggle" aria-hidden="true">+</span>
        </summary>
        <div className="record-detail">
          <dl className="record-stats">
            <div><dt>Lanzamiento</dt><dd>{skill.castTime === 0 ? 'Instantáneo' : `${number(skill.castTime)} s`}</dd></div>
            <div><dt>Objetivo</dt><dd>{skill.target}</dd></div>
            <div><dt>Nivel requerido</dt><dd>{skill.level}</dd></div>
            <div><dt>Se obtiene</dt><dd>{acquisition(skill)}</dd></div>
            {skill.healthCost > 0 && <div><dt>Coste de vida</dt><dd>{number(skill.healthCost)}</dd></div>}
            {skill.radius > 0 && <div><dt>Radio de efecto</dt><dd>{number(skill.radius)} m</dd></div>}
          </dl>
          {skill.effects.length > 0 ? (
            <div className="record-effects">
              {skill.effects.map((effect, i) => (
                <p key={i}>
                  <strong>{effect.type}</strong>
                  <span>Potencia ×{number(effect.magnitude)}{effect.duration > 0 ? ` · ${number(effect.duration)} s` : ''}{effect.tick > 0 ? ` · cada ${number(effect.tick)} s` : ''}</span>
                </p>
              ))}
            </div>
          ) : <p className="data-note">Desglose de efectos pendiente de publicar.</p>}
          {showClasses && (
            <div className="skill-users">
              <p>Disponible en {users.length} profesiones</p>
              <div>
                {baseClasses.filter(c => roots.has(c.slug)).map(c => {
                  const hasSkill = c.skills.includes(skill.name);
                  const representative = hasSkill ? c : users.filter(user => user.rootSlug === c.slug).sort((a, b) => a.tier - b.tier)[0];
                  return representative ? <Link key={c.slug} href={`/clases/${representative.slug}`}>{hasSkill ? c.name : `${c.name} · ${representative.name}`}</Link> : null;
                })}
              </div>
            </div>
          )}
        </div>
      </details>
    </article>
  );
}
