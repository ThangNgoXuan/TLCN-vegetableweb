import React from 'react'
import Helmet from '../components/Helmet'
import Section, {SectionTitle, SectionBody} from '../components/Section'
import banner from '../images/banner2.jpg'
const center_content = {
    margin: '0 0 0 50%',
    transform: 'translateX(-50%)'

}

const Intro = () => {
    return (
        <div>
            <Helmet title="Giới thiệu">
            <Section>
                <SectionTitle>
                    Về Nông sản hữu cơ
                </SectionTitle>
                <SectionBody >
                    <div className="intro__txt">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam erat quis lorem facilisis vestibulum. Etiam gravida nisl ac lacus ultrices, id dapibus massa malesuada. Nullam sit amet nibh a felis bibendum mattis sed faucibus erat. Cras varius blandit turpis nec faucibus. Duis nec vestibulum metus. Pellentesque at tristique enim. Donec dapibus mattis ex non accumsan. Vestibulum vel tincidunt justo. Mauris sapien libero, commodo vel metus vitae, porta placerat quam. Curabitur bibendum tempor diam in malesuada. Mauris luctus magna interdum, aliquet leo non, tincidunt nisi. Quisque sollicitudin mauris in massa rhoncus ultricies. Aliquam dictum nibh in placerat suscipit.
                    <br />
                    <br />
                    <img src={banner} alt="#" style={center_content}/>
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam erat quis lorem facilisis vestibulum. Etiam gravida nisl ac lacus ultrices, id dapibus massa malesuada. Nullam sit amet nibh a felis bibendum mattis sed faucibus erat. Cras varius blandit turpis nec faucibus. Duis nec vestibulum metus. Pellentesque at tristique enim. Donec dapibus mattis ex non accumsan. Vestibulum vel tincidunt justo. Mauris sapien libero, commodo vel metus vitae, porta placerat quam. Curabitur bibendum tempor diam in malesuada. Mauris luctus magna interdum, aliquet leo non, tincidunt nisi. Quisque sollicitudin mauris in massa rhoncus ultricies. Aliquam dictum nibh in placerat suscipit.tis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                   </div>
                </SectionBody>
            </Section>
            </Helmet>
        </div>
    )
}

export default Intro
