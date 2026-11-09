"use client";
import { useEffect, useRef, useState } from "react";
import data from "@/content/portfolio.json";
import icons from "@/content/icons.json";

type IconName = keyof typeof icons;
type Project = typeof data.projects[number];
const external = { target: "_blank", rel: "noopener noreferrer" };
const projectIcons: Record<string, IconName> = { intuicao:"diagram-project", tupi:"book-open", kaggle:"database", gesturelab:"flask", pokedex:"code", labdig:"microchip" };
const projectColors: Record<string,string> = { intuicao:"#477b58", tupi:"#2fa499", kaggle:"#d6a42b", gesturelab:"#477fba", pokedex:"#d55867", labdig:"#9168a4" };
function Icon({ name, size=20, className="" }: {name:IconName;size?:number;className?:string}) {
  const icon=icons[name];
  return <svg className={`icon ${className}`} width={size} height={size} viewBox={icon.viewBox} fill="currentColor" aria-hidden="true" focusable="false">{icon.paths.map((d,i)=><path key={i} d={d}/>)}</svg>;
}
function NameSprite(){return data.profile.nameSprite.enabled?<span className="name-sprite" title={data.profile.nameSprite.label} aria-hidden="true" style={{backgroundImage:`url(${data.profile.nameSprite.image})`,backgroundSize:data.profile.nameSprite.backgroundSize,backgroundPosition:data.profile.nameSprite.backgroundPosition}}/>:null;}
function ProfileName(){
 const words=data.profile.name.trim().split(/\s+/);
 const suffixLength=['de','da','do','das','dos'].includes(words.at(-2)?.toLowerCase()||'')?2:1;
 const prefix=words.slice(0,-suffixLength).join(' ');
 const suffix=words.slice(-suffixLength).join(' ');
 return <span className="name-with-sprite">{prefix&&<>{prefix}{" "}</>}<span className="name-ending">{suffix}<NameSprite/></span></span>;
}
function ExternalIcon(){return <Icon name="arrow-up-right-from-square" size={12}/>;}
function SectionTitle({children}:{children:React.ReactNode}){return <h2 className="section-title">{children}</h2>;}
function ProjectCard({project}:{project:Project}){
 return <article className="resource-card" style={{"--card-color":projectColors[project.id]} as React.CSSProperties}>
   {project.showImagePreview&&project.image&&<figure className="project-preview"><a href={project.imageSource} {...external}><img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async"/></a><figcaption>{project.caption} <a href={project.imageSource} {...external}>Fonte<ExternalIcon/></a></figcaption></figure>}
   <div className="resource-heading"><Icon name={projectIcons[project.id]} size={29}/><span>{project.type}</span></div>
   <h3><a href={project.url} {...external}>{project.name}<ExternalIcon/></a></h3>
   <p>{project.summary}</p>
   <ul className="tags" aria-label="Tecnologias">{project.technologies.map(tech=><li key={tech}>{tech}</li>)}</ul>
   <div className="resource-links"><a href={project.url} {...external}><Icon name="github" size={15}/>Repositório</a>{project.demo&&<a href={project.demo} {...external}>{project.demoLabel}<ExternalIcon/></a>}</div>
   <details className="project-details"><summary>Detalhes, autoria e limites <span className="details-symbol" aria-hidden="true"/></summary><div className="project-details-body"><p>{project.details}</p><h4>Contribuição e autoria</h4><p>{project.contribution}</p><h4>Escopo e limites</h4><p>{project.limitation}</p>{project.image&&!project.showImagePreview&&<figure><a href={project.imageSource} {...external}><img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy"/></a><figcaption>{project.caption}</figcaption></figure>}</div></details>
 </article>;
}
export default function Home(){
 const [active,setActive]=useState("sobre");
 const [menuOpen,setMenuOpen]=useState(false);
 const [educationOpen,setEducationOpen]=useState<number|null>(0);
 const [filter,setFilter]=useState("Todos");
 const [copied,setCopied]=useState(false);
 const [copyError,setCopyError]=useState(false);
 const menuButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
   const update=()=>{const sections=[...document.querySelectorAll<HTMLElement>('main > section[id]')];let current=sections[0]?.id||'sobre';for(const section of sections){if(section.getBoundingClientRect().top<180)current=section.id;}if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-8)current='contato';setActive(current);};
   update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('hashchange',update);
   return()=>{window.removeEventListener('scroll',update);window.removeEventListener('hashchange',update);};
 },[]);
 useEffect(()=>{
   if(!menuOpen)return;
   const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenuOpen(false);menuButton.current?.focus();}};
   document.addEventListener('keydown',onKey);
   return()=>document.removeEventListener('keydown',onKey);
 },[menuOpen]);
 async function copyEmail(){try{await navigator.clipboard.writeText(data.profile.email);setCopied(true);setCopyError(false);setTimeout(()=>setCopied(false),2500);}catch{setCopyError(true);}}
 const filtered=data.projects.filter(project=>filter==='Todos'||project.category===filter);
 const profileLinks=[
  {label:'GitHub',icon:'github' as IconName,url:data.profile.github,color:'#d9a62b',internal:false},
  {label:'LinkedIn',icon:'linkedin' as IconName,url:data.profile.linkedin,color:'#2c98f0',internal:false},
  {label:'E-mail',icon:'envelope' as IconName,url:`mailto:${data.profile.email}`,color:'#2fa499',internal:true},
  {label:'Pesquisa',icon:'graduation-cap' as IconName,url:'#pesquisa',color:'#467c58',internal:true},
  {label:'Projetos',icon:'code' as IconName,url:'#projetos',color:'#a16bb2',internal:true},
  {label:'Documentação',icon:'file-lines' as IconName,url:data.profile.documentation,color:'#d95a65',internal:false}
 ];
 return <>
  <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <div className="site-shell" id="inicio">
   <header className="mobile-header"><a href="#sobre" aria-label={data.profile.name}><img src={data.profile.photo} alt="" width="34" height="34"/><ProfileName/></a><button ref={menuButton} aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={()=>setMenuOpen(!menuOpen)}><Icon name={menuOpen?'xmark':'bars'} size={23}/></button></header>
   {menuOpen&&<button className="menu-overlay" aria-label="Fechar menu de navegação" onClick={()=>{setMenuOpen(false);menuButton.current?.focus();}}/>}
   <aside className={`sidebar ${menuOpen?'is-open':''}`}>
    <a href="#sobre" onClick={()=>setMenuOpen(false)} className="portrait-link"><img className="portrait" src={data.profile.photo} alt={data.profile.photoAlt} width="150" height="150"/></a>
    <a href="#sobre" aria-label={data.profile.name} className="sidebar-name" onClick={()=>setMenuOpen(false)}><ProfileName/></a>
    <p className="sidebar-description">ENGENHARIA DE COMPUTAÇÃO<br/><a href="#formacao" onClick={()=>setMenuOpen(false)}>POLI-USP</a></p>
    <nav id="main-nav" aria-label="Navegação principal">{data.navigation.map(item=><a key={item.id} href={`#${item.id}`} className={active===item.id?'active':''} aria-current={active===item.id?'location':undefined} onClick={()=>{setActive(item.id);setMenuOpen(false);}}>{item.label}</a>)}</nav>
    <div className="sidebar-social"><a href={data.profile.github} aria-label="GitHub de Luigi" {...external}><Icon name="github" size={19}/></a><a href={data.profile.linkedin} aria-label="LinkedIn de Luigi" {...external}><Icon name="linkedin" size={19}/></a><a href={`mailto:${data.profile.email}`} aria-label="E-mail de Luigi"><Icon name="envelope" size={19}/></a></div>
    {data.visualSignature.enabled&&<div className="sidebar-signature"><img src={data.visualSignature.image} alt={data.visualSignature.alt} width={data.visualSignature.width} height={data.visualSignature.height}/></div>}
    <p className="sidebar-footer">© 2026 {data.profile.name}<br/>{data.profile.location}<br/><a href="/atualizar">Como atualizar</a><span aria-hidden="true"> · </span><a href="/creditos">Créditos</a></p>
   </aside>
   <main id="conteudo"><h1 className="sr-only">{data.profile.name} · Portfólio</h1>
    <section id="sobre" className="section about-section">
     <SectionTitle>Sobre mim</SectionTitle>
     <div className="about-prose">{data.profile.aboutOverview.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div>
     <div className="profile-links">{profileLinks.map(item=><a className="profile-card" key={item.label} href={item.url} {...(!item.internal?external:{})} style={{"--card-color":item.color} as React.CSSProperties}><Icon name={item.icon} size={29}/><span>{item.label}</span></a>)}</div>
    </section>
    <section id="projetos" className="section projects-section">
     <SectionTitle>Projetos e recursos</SectionTitle>
     <p className="section-intro">Aplicações, experimentos e materiais que desenvolvi ou dos quais participei. Cada projeto apresenta sua autoria, documentação e limites.</p>
     <div className="filter-row"><div className="filters" aria-label="Filtrar projetos por área">{['Todos','IA','Dados','Software','Hardware'].map(item=><button key={item} aria-pressed={filter===item} className={filter===item?'selected':''} onClick={()=>setFilter(item)}>{item}</button>)}</div><span aria-live="polite" className="project-count">{filtered.length} {filtered.length===1?'projeto':'projetos'}</span></div>
     <div className="resource-grid">{filtered.map(project=><ProjectCard key={project.id} project={project}/>)}</div>
     <a className="all-projects" href={`${data.profile.github}?tab=repositories`} {...external}><Icon name="github" size={17}/>Todos os repositórios no GitHub<ExternalIcon/></a>
    </section>
    <section id="pesquisa" className="section research-section">
     <SectionTitle>Pesquisa</SectionTitle>
     <p className="section-intro">Iniciativas que conectam computação, linguagem, educação e interação.</p>
     <div className="timeline">{data.research.map((item,index)=><article className="timeline-item" key={item.title}><a className={`timeline-icon tone-${index}`} href={item.url} aria-label={item.title} {...external}><Icon name={index===0?'book-open':'graduation-cap'} size={21}/></a><div className="timeline-content"><span className="item-meta">{item.institution}</span><h3>{item.title}</h3><p>{item.text}</p><a className="inline-link" href={item.url} {...external}>{item.linkLabel}<ExternalIcon/></a></div></article>)}</div>
     <p className="research-note">Código e metodologia estão disponíveis nos links de cada iniciativa.</p>
    </section>
    <section id="formacao" className="section education-section">
     <SectionTitle>Formação</SectionTitle>
     <div className="education-accordion">{data.education.map((item,index)=><div className={`education-item ${educationOpen===index?'expanded':''}`} key={item.title}><h3><button onClick={()=>setEducationOpen(educationOpen===index?null:index)} aria-expanded={educationOpen===index} aria-controls={`education-panel-${index}`} id={`education-heading-${index}`}>{item.title}<Icon name={educationOpen===index?'minus':'plus'} size={14}/></button></h3><div role="region" id={`education-panel-${index}`} aria-labelledby={`education-heading-${index}`} hidden={educationOpen!==index} className="education-panel"><p><strong>{item.institution}</strong></p><p>{item.status}.</p><a href={`${data.profile.source}#formação-e-aprendizado`} {...external}>Informações no perfil público<ExternalIcon/></a></div></div>)}</div>
    </section>
    <section id="trajetoria" className="section experience-section">
     <SectionTitle>Trajetória</SectionTitle>
     <p className="section-intro">Experiências com dados, tecnologia e necessidades de negócio.</p>
     <div className="timeline">{data.experience.map((item,index)=><article className="timeline-item" key={item.company}><span className={`timeline-icon tone-${index}`}><Icon name={index===0?'diagram-project':index===1?'code':'database'} size={21}/></span><div className="timeline-content"><h3>{item.company}</h3><span className="item-meta">{item.area}</span><p>{item.text}</p></div></article>)}</div>
     <a className="inline-link" href={`${data.profile.github}#trajetória-profissional`} {...external}>Mais sobre a trajetória<ExternalIcon/></a>
    </section>
    <section id="contato" className="section contact-section">
     <SectionTitle>Contato</SectionTitle>
     <p className="section-intro">{data.contactText}</p>
     <div className="contact-item"><span className="contact-icon"><Icon name="envelope" size={29}/></span><div><a className="contact-email" href={`mailto:${data.profile.email}`}>{data.profile.email}</a><button className="copy-email" onClick={copyEmail} aria-label={copied?'E-mail copiado':'Copiar e-mail'}><Icon name={copied?'check':'copy'} size={16}/></button><span className="copy-feedback" aria-live="polite">{copied?'E-mail copiado.':copyError?'Selecione o endereço para copiá-lo.':''}</span></div></div>
     <div className="contact-item"><span className="contact-icon"><Icon name="location-dot" size={29}/></span><div><p>{data.profile.location}</p><span>Engenharia de Computação · Poli-USP</span></div></div>
     <div className="contact-social"><a href={data.profile.github} {...external}><Icon name="github" size={18}/>GitHub<ExternalIcon/></a><a href={data.profile.linkedin} {...external}><Icon name="linkedin" size={18}/>LinkedIn<ExternalIcon/></a></div>
    </section>
    <footer className="page-footer"><span className="footer-signature">{data.visualSignature.enabled&&<img src={data.visualSignature.image} alt="" aria-hidden="true" width={data.visualSignature.width} height={data.visualSignature.height}/>}<span>© 2026 {data.profile.name}<br/>{data.updated}</span></span><a href="/atualizar">Como atualizar este portfólio</a><a href="#sobre" aria-label="Voltar ao início"><Icon name="arrow-up" size={16}/></a></footer>
   </main>
  </div>
 </>;
}
