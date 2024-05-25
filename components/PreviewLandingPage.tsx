import React from 'react';

interface Component {
  type: 'footer' | 'header' | 'text' | 'image';
  content?: string;
}
export type template = 'default' | 'frisco';
interface PreviewSectionProps {
  title: string;
  description: string;
  components: Component[];
  template: template;
}




const PreviewSection: React.FC<PreviewSectionProps> = ({ title, description, components, template="frisco" }) => {
  return templates[template]({ title, description, components, template })
};

const DefaultTemplate: React.FC<PreviewSectionProps> = ({ title, description, components = [], template }) => {
  console.log({components})
  return (
    <div className="preview h-full items-center w-full" style={{
      display: "grid",
      gridAutoRows: "1fr" ,
      background: "#fff"
    }}>
        {(components && components.length > 0) && components?.map((component, index) => (
            <>
            {component.type === 'header' && <header className='bg-[#fff] p-4 text-[#111] font-bold text-4xl flex justify-center py-10'>
                {component.content}
        </header> }
          {
            (component.type === 'text' || component.type === 'image') && (
              <div className='h-full grid' style={{
                gridTemplateRows: "1fr auto",
              }}>
                {component.type === 'image' && (
                      <section className='h-full place-items-center mx-auto aspect-square' style={{
                        backgroundImage: `url(${component.content})`,
                        backgroundSize: "cover",
                      }}>
                      </section>
                )}
                {component.type === 'text' && (
                  <p className='text-black text-center'>
                    {component.content}
                  </p>
                )}
              
              </div>
            )
          }
          {
            component.type === 'footer' && (
              <footer className='bg-[#F8F8F8] h-full mt-10 text-black font-bold text-2xl flex justify-center items-center'>
                {component.content}
              </footer>
            )
          
          }
            </>
        ))}
        
      
        


      {/* <div className='h-full'>
        <h3>{title}</h3>
        <p>{description}</p>
        {components.map((component, index) => (
          <div key={index} className={`component-${component.type}`}>
            {component.type === 'header' && <h1>{component.content}</h1>}
            {component.type === 'text' && <p>{component.content}</p>}
            {component.type === 'image' && <img src={component.content} alt="Dynamic Content" />}
            {component.type === 'footer' && <footer>{component.content}</footer>}
          </div>
        ))}
      </div> */}
    </div>
  )
}
const FriscoTemplate: React.FC<PreviewSectionProps> = ({ title, description, components, template }) => {
 return (
  <>
      <div 
        className="preview h-full items-center w-full" 
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          background: "#fff"
        }}>
            {components?.map((component, index) => (
            <>
            {component.type === 'header' && <header className='bg-[#fff] p-4 text-[#111] font-bold text-4xl flex justify-center py-10'>
                <div>
                    <header className='bg-[#fff] p-4 text-[#111] font-bold text-4xl flex justify-center py-10'>
                      {component.content}
                    </header>
                    <div>Author: 1</div>
                </div>
        </header> 
        }
              <div className='h-full grid' style={{
                gridTemplateRows: "1fr auto",
              }}>
                {component.type === 'image' && (
                      <section className='h-full place-items-center mx-auto aspect-square' style={{
                        backgroundImage: `url(${component.content})`,
                        backgroundSize: "cover",
                      }}>
                      </section>
                )}
                {component.type === 'text' && (
                  <p className='text-black text-center max-w-[40ch] mx-auto'>
                    {component.content}
                  </p>
                )}
              
              </div>
          {
            component.type === 'footer' && (
              <footer className='bg-[#F8F8F8] h-full mt-10 text-black font-bold text-2xl flex justify-center items-center'>
                {component.content}
              </footer>
            )
          
          }
            </>
        ))}
    </div>
  </>
 )
}
const templates = {
  default: DefaultTemplate,
  frisco: FriscoTemplate,
}



export default PreviewSection;
