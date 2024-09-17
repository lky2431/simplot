import { createFileRoute } from '@tanstack/react-router'
import DocPage from '@/DocPage'


export const Route = createFileRoute('/doc/start')({
  component: () => <DocPage >
    <p>Let get started now!</p>
    <br />
    <p>Let get familar with the canvas first.</p>
    <p>Let create a free accout and login. A dashboard with sample project will be shown. Press the '1. Get Started'.</p>
    <p>You can see that the screen is divided into two section. The left bigger part is node based editor. The right part is chart preview.</p>
    <img src='/images/getstart/split.png' className='h-48' />
    <p>You can see two small button in left bottom corner. The upper one is button to add node. The another one is data import.</p>
    <img src='/images/getstart/button.png' className='h-32' />
    <br />
    <h1 className='text-lg my-2'>Data import</h1>
    <p>Press the data import button. Import a 'pollution.csv' file.</p>
    <p>In the canvas, find two import data node. If the node is missing, it can be added. Press the edit button. A window will be pop up. Select the polluton.csv </p>
    <p>In one import data node, point your mouse at A1 cell. Press left button and holding it and moving to A10 cell. The column A will be selected. Close the window.</p>
    <img src='/images/getstart/import.png' className='h-64' />
    <p>In the other node, perform the same to select column B.</p>

    <br />
    <h1 className='text-lg my-2'>Connect to Chart</h1>
    <p>Find or add a line chart node. Connect the handle of first import data node to the x handle of line chart node and then connect the other import data node to the y handle.</p>
    <img src='/images/getstart/connect.png' className='h-64' />
    <p>The y handle only accept continuous data. A warning should be shown if the first import data node is tried to connect to line chart node.</p>

    <br />
    <h1 className='text-lg my-2'>Final output</h1>
    <p>Connect the output handle of line chart node to the output node. You can see a chart being plotted in the preview window.</p>
    <p>Move the slider on the line chart node. The preview line chart response in real time.</p>
    <p>Press the save button in top right corner to save your project. Press the download button to get the chart as an image.</p>
    <img src='/images/getstart/save.png' className='h-20' />
    <p>Congratulation!. This is the first chart you plot with Simplot. Let continue to know how to configure the style.</p>

  </DocPage>
})