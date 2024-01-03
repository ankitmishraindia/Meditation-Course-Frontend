import { document } from 'postcss'
import Data from '../Data/pageData.json'
import Image from 'next/image'
import { FaRupeeSign } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";

export default function Home() {

  const {
         instructor,
         course,
         about_instructor,
         testimonial
        }=Data

  return (
    <div className='w-full space-y-0'>

        <header className='w-full h-[500px] relative'>
           <Image src='/header-image.jpeg' layout='fill' objectFit='cover' alt='header-image'/>
           <div className='absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(0,0,0,0.8),rgba(0,0,0,0.1))]'></div>
           <div className='absolute left-32 bottom-10  w-1/2 space-y-1'>
              <h3 className='text-3xl font-bold text-gray-300'>{instructor.name}</h3>
              <h1 className='text-5xl font-bold text-white'>{course.title}</h1>
           </div>
        </header>

        <main className='w-full relative space-y-7'>

           <div className='w-[60%] pl-[15%] space-y-5'>
               <div className='flex w-[80%]'>
                 <div className='py-2 px-10 font-semibold text-xl border-b-4 border-b-violet-600 cursor-pointer'>ABOUT</div>
                 <div className='py-2 px-10 font-semibold text-xl cursor-pointer'>INSTRUCTOR</div>
                 <div className='py-2 px-10 font-semibold text-xl cursor-pointer'>REVIEWS</div>
               </div>
               <h2 className='text-3xl font-bold'>About the course</h2>
               <div className='space-y-4 text-xl' dangerouslySetInnerHTML={{__html:course.about.html_content}}>
               </div>
               <h2 className='text-3xl font-semibold'>What to expect from the course</h2>
               <div className='text-xl' dangerouslySetInnerHTML={{__html:course.what_to_expect.html_content}}></div>
               <h2 className='text-3xl font-semibold'>Key topics covered</h2>
               <div className='space-y-2'>
                  <div className='text-xl' dangerouslySetInnerHTML={{__html:course.key_topics.html_content}}></div>
               </div>
           </div>

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

           <div className='space-y-2 w-[94%] pl-[15%] pt-8'>
               <h2 className='text-3xl font-bold'>About the Instructor</h2>
               <div>
                  <div className='text-sm rounded-full w-[100px] h-[100px] overflow-hidden relative'>
                     <Image src='/instructor-image.jpeg' layout='fill' objectFit='cover' alt='instructor-image'/>
                  </div>
                  
               </div>
           </div>
        </main>
    </div>
  )
}
