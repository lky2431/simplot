import { createFileRoute } from '@tanstack/react-router'
import DocPage from '@/DocPage'


export const Route = createFileRoute('/doc/all')({
  component: () => <DocPage >
    <p>Let create something even crazier</p>
    <br />
    <p>Go to the dashboard and tap the project called "4. All together"</p>
    <p>import the "index-change.csv". Inspect the dataset. The first column in the month in a year. The third column is the value of certain index in this month. The second column is the change of this index compared to previous month. </p>
    <img src='/images/all/dataset.png' className='h-72' />
    <p>Now you want to use a line chart to represent the change and bar chart to reflect the change.</p>
    <p>Add three import data node. Attach each column data to each node.</p>
    <p>Add a bar chart and a line chart node. Connect the month data to x handle of both chart node. Connect the change data to y handle of bar chart node and connect the value data to y handle of line chart node.</p>
    <p>Finally, add a merge node. Merge node is used to combine different type of chart into one chart.</p>
    <img src='/images/all/nodes.png' className='h-72' />
    <p>Attach the merge node to the output node. Adjust the style. Let see the chart in the preview window</p>
    <img src='/images/all/final.png' className='h-96' />
    <p>How special this chart is? By combining different type of chart, amazing chart can be created. Use your imagination to create those sepecial chart. </p>
    <br/>
    <p>There is some limitation in combine the chart. First, you cannot combine a pie chart with other type of chart but you can combine several pie chart.</p>
    <img src='/images/all/threepie.png' className='h-72' />
    <p>Secondly, all chart must have x dataset as either categorical or continuous data to combine them.</p>


  </DocPage>
})