import { createFileRoute } from '@tanstack/react-router'
import DocPage from '@/DocPage'


export const Route = createFileRoute('/doc/styling')({
  component: () => <DocPage >
    <p>You may feel that the previous chart look too normal. We are going to dive in the style now to make your chart look well-designed.</p>
    <br />
    <p>The output node have three handles. Background, Window, and Style</p>
    <p className='mt-2'>Background</p>
    <p className='text-neutral-400'>Control the background of the chart. The background can be mono color or gradient.</p>
    <p className='mt-2'>Window</p>
    <p className='text-neutral-400'>Control the overall dimension of the chart including margin, aspect ratio, grid, axis and title.</p>
    <p className='mt-2'>Style</p>
    <p className='text-neutral-400'>Control the color scheme.</p>
    <br />
    <p>One important concept is that you don't need to define everything for a chart. Simplot have some pre-defined style. You can only add the node when you want to change some style. For example, the color scheme node can choose the dark mode or light mode. A default background color will be used to plot the chart. However, you can override it by define another color in background or window node.</p>
    <br />
    <p>Let's do some experiment.</p>
    <p>Go to the dashboard and tap the project called "2. Advanced Styling"</p>
    <p>import the "favorite-sport.csv". Assign the data to two import data node. Add a pie chart node and connect the imported data to it. Connect the pie chart node to the output node. A pie chart should appear in preview window.</p>
    <p>Find or add a color scheme node, connect it to the style handle of output node. Change the color scheme. The preview window should reflect what you change.</p>
    <div className='flex'>
      <img src='/images/style/colorscheme.png' className='h-64' /><img src='/images/style/color.png' className='h-64' />
    </div>
    <p>Find or add a background node. Add two color node. Attached the color nodes to the background node. Attach the background node to background handle of output node. Change the color of the color node.</p>
    <img src='/images/style/colornode.png' className='h-96' />
    <p>The background of the chart is not only black or white now. Fine tune the color to make it look what you want.</p>
    <p>Find or add a window node. Input a title Favorite sport. Change the aspect ratio and margin. There is some checkbox about axis and grid. However, this attribute do not apply on pie chart. You can use them for other type of chart. </p>
    <p>Add a color node and attached it to the frame color handle of the window node. The color of title and label will be determined by this color node.</p>
    <img src='/images/style/window.png' className='h-96' />
    <p>That's it. Now you have a chart with style that look different from what you usually created in spreadsheet.</p>
    <img src='/images/style/final.png' className='h-96' />
    <p className='text-lg mt-4 mb-2'>Last but not least</p>
    <p>Simplot is designed to be style is independent to data. That mean you can predefined a style. You can import other dataset to make a plot which have identical style in the future. This is  especially useful if you have to create chart regularly. The defined style template make your chart look great and consistent.</p>
  </DocPage>
})