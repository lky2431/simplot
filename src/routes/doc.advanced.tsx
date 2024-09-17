import { createFileRoute } from '@tanstack/react-router'
import DocPage from '@/DocPage'


export const Route = createFileRoute('/doc/advanced')({
  component: () => <DocPage >
    <p>Let create some advanced chart.</p>
    <br />
    <p>Go to the dashboard and tap the project called "3. Advanced Chart"</p>
    <p>import the "region-sales.csv". This dataset have four column. We have to add four import data node here. </p>
    <p>Assign the data to the import data nodes. Add a bar chart node. Set the bar chart node as stacked bar.</p>
    <p>Connect the imported data source with x-axis data to the x handle of bar chart node. Connect the other three node to the y handle of bar chart node.</p>
    <img src='/images/advanced/node.png' className='h-72' />
    <p>Connect the bar chart node to the output node. You can see a stacked bar chart now. Each bar is composed of three section.</p>
    <p>In your import data node, input a label in the textarea.</p>
    <img src='/images/advanced/label.png' className='h-72' />
    <p>Add a window node and make sure you check the Legend box. You can see a legend appear in the chart with the label you specified.</p>
    <img src='/images/advanced/final.png' className='h-96' />
  </DocPage>
})