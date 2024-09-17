import { createFileRoute } from '@tanstack/react-router'
import DocPage from '@/DocPage'




export const Route = createFileRoute('/doc/concept')({
  component: () => <DocPage >
    <p>Welcome to Simplot</p>
    <br />
    <p>Simplot is aimed to provide you new experince in chart plotting by node based editor.</p>
    <p>In this tutorial, you will learn how to use Simplot to plot chart. The concept will be discussed first.</p>
    <br />
    <h1 className='text-lg my-2'>Node</h1>
    <p>Every element in Simplot is node. The node contain some property and attribute the control the output.</p>
    <p>The node will have some handle. The handle is used to connect with other node. Some handle can only be used to connect to other node. Some handle can only be connected to. Every handle will have its property and they can only be connected to other handle with the same property. You will learn the property in other tutorial.</p>
    <p>The attribute and data of the node will also be connected when the node is connected to form a final output.</p>
    <p>The node can be drag to adjust its position. You can select a node and then press the "Back" key on your keyboard to delete it.</p>
    <img src='/images/concept/handle.png' className='h-64' />
    <br />
    <h1 className='text-lg my-2'>Key Element</h1>
    <p>Every Chart should have the following element</p>
    <p className='mt-2'>1. Data</p>
    <p className='text-neutral-400'>What to be display?</p>
    <p className='mt-2'>2. Plot</p>
    <p className='text-neutral-400'>How to organiza the data? Bar chart? Line chart? Pie chart?</p>
    <p className='mt-2'>3. Style</p>
    <p className='text-neutral-400'>The final look of the chart</p>
    <p>Every node can be used must be one of these three type</p>
    <br />
    <h1 className='text-lg my-2'>Dataset type</h1>
    <p>A dataset can be either continuous data or categorical data</p>
    <p className='mt-2'>Continuous Data</p>
    <p className='text-neutral-400'>can take on any value within a defined range and is often measured on a continuous scale, such as weight, height, or temperature. </p>
    <p className='mt-2'>Categorical Data</p>
    <p className='text-neutral-400'>consists of discrete values that fall into distinct categories or groups, such as gender, ethnicity, or product types.</p>
    <p>The type of dataset affect the final chart and connection of chart. Simplot can automatically determine whether a dataset is continuous or categorical</p>
  </DocPage>
})