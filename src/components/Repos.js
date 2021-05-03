import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} =React.useContext(GithubContext)

const languages=repos.reduce((total,item)=>{
  const {language,stargazers_count}=item
  if(!language){
    return total
  }
  if(!total[language]){
    total[language]={label:language,value:1,stargazers_count:1}
  }
  total[language]={...total[language],
    value:total[language].value+1,
    stargazers_count:total[language].stargazers_count+stargazers_count}
  return total
},{})
const mostUsed=Object.values(languages)
.sort((a,b)=>b.value-a.value)

///most stars per language
const mostPopular=Object.values(languages).sort((a,b)=>b.stargazers_count-a.stargazers_count).map(item=>{
  return {...item,value:item.stargazers_count}
})
////stars and forks

let {stars,forks}=repos.filter(item=>item.stargazers_count===0).reduce((total,item)=>{
  const {stargazers_count,name,forks}=item;
  total.forks[forks]={label:name,value:forks}
  total.stars[stargazers_count]={label:name,value:stargazers_count}
  return total
},{stars:{},forks:{}})
stars=Object.values(stars).slice(-5).reverse()
forks=Object.values(forks).slice(-5).reverse()

  return <section className="section">
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <div></div>
        <Doughnut2D data={mostPopular}/>
        <div></div>
        <Column3D data={stars}/>
        <Bar3D data={forks}/>
      </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
