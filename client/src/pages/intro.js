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
                    <b>The standard Lorem Ipsum passage, used since the 1500s</b><br /><br />
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    <br /><br />
                    <b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b><br />
                    <br />
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    </div>
                    <br />
                    <br />
                    <img src={banner} alt="#" style={center_content}/>
                    <br />
                    <br />
                    <b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b><br />
                    <br />
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                   
                </SectionBody>
            </Section>
            </Helmet>
        </div>
    )
}

export default Intro
