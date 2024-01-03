import { document } from 'postcss'
import Data from '../Data/pageData.json'
import Image from 'next/image'
import { FaRupeeSign,FaFacebook,FaYoutube,FaInstagramSquare } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import parse from 'html-react-parser'


export default function Home() {

  const {
         instructor,
         course,
         about_instructor,
         testimonial
        }=Data
     
        //parse what_to_expect_html data with check icon
        const expected_html=parse(course.what_to_expect.html_content,{
         replace:(domNode)=>{
            if(domNode.name==='li'){
               return(
                  <div key={domNode.children[0].data} className='flex items-center'>
                     <FaCheck className='mr-4'/>
                     <span>{domNode.children[0].data}</span>
                  </div>
               )
            }
         }
        })

        //parse key topics html data with check icon to make bold in desascending order
        var boldNum=5;
        const key_topics_html=parse(course.key_topics.html_content,{
         replace:(domNode)=>{
      
            if(domNode.name==='li'){
               
               const words=domNode.children[0].data.split(' ')
               const changedText=words.map((item,index)=>(index<boldNum?`<b>${item}</b>`:item)).join(' ')
               boldNum=boldNum-1;
               return(
                  <div key={domNode.children[0].data} className='flex'>
                     
                     <span><FaCheck className='mr-5'/></span>
                     <span dangerouslySetInnerHTML={{__html:changedText }}></span>
                  </div>
               )
            }
         }
        })

  return (
    <div className='w-full space-y-0'>
{/* *******************************header with image********************** */}
        <header className='w-full h-[500px] relative'>
           <Image src='/header-image.jpeg' fill={true} style={{objectFit:'cover'}}  alt='header-image'/>
           <div className='absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(0,0,0,0.8),rgba(0,0,0,0.1))]'></div>
           <div className='absolute left-32 bottom-10  w-1/2 space-y-1'>
              <h3 className='text-3xl font-bold text-gray-300'>{instructor.name}</h3>
              <h1 className='text-5xl font-bold text-white'>{course.title}</h1>
           </div>
        </header>

{/* ****************************main part(remaing part of the page) ********/}
        <main className='w-full relative space-y-7'>

           <div className='w-[60%] pl-[15%] space-y-5'>
               <div className='flex w-[80%]'>
                 <div className='py-2 px-10 font-semibold text-xl border-b-4 border-b-violet-600 cursor-pointer'>ABOUT</div>
                 <div className='py-2 px-10 font-semibold text-xl cursor-pointer'>INSTRUCTOR</div>
                 <div className='py-2 px-10 font-semibold text-xl cursor-pointer'>REVIEWS</div>
               </div>
               {/* ************About the course*********** */}
               <h2 className='text-3xl font-bold'>About the course</h2>
               <div className='space-y-4 text-xl' dangerouslySetInnerHTML={{__html:course.about.html_content}}>
               </div>
               {/* **********What to expect ************** */}
               <h2 className='text-3xl font-semibold'>What to expect from the course</h2>
               <div className='text-xl'>
                  {expected_html}
               </div>
               <h2 className='text-3xl font-semibold'>Key topics covered</h2>
               <div className='space-y-2'>
                  <div className='text-xl'>
                     {key_topics_html}
                  </div>
               </div>
           </div>
        {/* ***************************Fee amount section in right side*********** */}
           <div className='absolute w-[280px] h-[300px] bg-violet-50 right-40 -top-20 p-5 flex flex-col justify-between'>
               <div>
                  <p className='font-bold'>Course fees</p>
                  <p className='flex'>
                     <span>{(course.fee.currency==='INR')?<FaRupeeSign size={22}/>:course.fee.currency}</span>
                     <span className='text-2xl font-semibold font-serif'>5,000</span>
                  </p>
               </div>
               <div className='space-y-2'>
                  <p className='font-semibold'>What's included:</p>
                  <ul className='text-sm space-y-1 list-none'>
                     {course.inclusions.on_demand_videos&&(<li className='flex items-center gap-2'><MdOndemandVideo/>
                     <span >{course.inclusions.on_demand_videos} on-demand videos.</span>
                     </li>)}
                     {course.inclusions.live_qa_sessions&&(<li className='flex items-center gap-2'><RiQuestionAnswerLine/>
                     <span >Live QA sessions.</span>
                     </li>)}
                     {course.inclusions.whatsapp_community&&(<li className='flex items-center gap-2'><RiQuestionAnswerLine/>
                     <span >An active whatsapp community.</span>
                     </li>)}
                  </ul>
               </div>
               <button className='bg-violet-800 text-white py-2 w-full rounded-2xl text-sm font-bold'>Register Today</button>
           </div>
          {/* *********************About the instructor************* */}
           <div className='space-y-2 w-[94%] pl-[15%] py-8'>
               <h2 className='text-3xl font-bold'>About the Instructor</h2>
               <div className='flex gap-5'>
                  <div className='text-sm rounded-full w-[100px] h-[100px] overflow-hidden relative'>
                     <Image src='/instructor-image.jpeg' fill={true} style={{objectFit:'cover'}} alt='instructor-image'/>
                  </div>
                  <div className='space-y-1'>
                     <div className='text-xl min-h-32' dangerouslySetInnerHTML={{__html:about_instructor.html_content}}></div>
                     <div className='flex gap-36'>
                        {instructor.social_media.facebook&&(<div className='flex items-center space-x-4'>
                           <FaFacebook className='text-blue-600' size={22}/>
                           <span>Facebook</span>
                        </div>)}
                        {instructor.social_media.twitter&&(<div className='flex items-center space-x-4'>
                           <FaSquareXTwitter size={22}/>
                           <span>Twitter</span>
                        </div>)}
                        {instructor.social_media.youtube&&(<div className='flex items-center space-x-4'>
                           <FaYoutube className='text-red-600' size={22}/>
                           <span>Youtube</span>
                        </div>)}
                        {instructor.social_media.instagram&&(<div className='flex items-center space-x-4'>
                           <FaInstagramSquare className='text-orange-800' size={22}/>
                           <span>Instagram</span>
                        </div>)}
                     </div>
                  </div>
                  
               </div>
           </div>
           {/* testimonial*************** */}
           <div className='relative w-full h-[300px] bg-gray-100 flex flex-col items-center justify-center space-y-5'>
               <div className='absolute top-1/2 left-[15%] w-[70%] flex justify-between'>
                  <IoIosArrowBack size={40} className='bg-gray-400 border rounded-full cursor-pointer'/>
                  <IoIosArrowForward size={40} className='bg-gray-400 border rounded-full cursor-pointer'/>
               </div>
               <p className='font-bold text-2xl w-1/2 text-center' >
                  <q>{testimonial.text}</q>
               </p>
               <div className='flex gap-3 items-center'>
                  <div className='w-[30px] h-[30px] rounded-full overflow-hidden relative'>
                     <Image src='/reviewer.jpeg' fill={true} style={{objectFit:'cover'}} alt='review-image'/>
                  </div>
                  <div className='space-y-0'>
                     <p className='text-sm font-semibold'>
                        {testimonial.reviewer_name}
                     </p>
                     <p className='text-sm'>
                        {testimonial.reviewer_designation}
                     </p>
                  </div>
               </div>
               <div className='flex gap-2 absolute bottom-4 left-1/2'>
                   <div className='w-[10px] h-[10px] bg-gray-300 rounded-full'></div>
                   <div className='w-[10px] h-[10px] bg-gray-300 rounded-full'></div>
                   <div className='w-[10px] h-[10px] bg-gray-400 rounded-full'></div>
               </div>
           </div>
        </main>
    </div>
  )
}
