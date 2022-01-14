import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery, useStaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class TeamMembersTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: teamMembers } = data.allTeamMembersJson

    return (
      <div className="columns is-multiline">
        {teamMembers &&
          teamMembers.map(({ node: teamMember }) => (
            <div className="is-parent column is-6" key={teamMember.name}>
              <article
                className="blog-list-item tile is-child box notification"
              >
                <header>
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: teamMember.picture
                      }}
                    />
                  </div>
                </header>
                <p>
                  {teamMember.name}
                  {teamMember.title}
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

TeamMembers.propTypes = {
  data: PropTypes.shape({
    allTeamMembersJson: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            linkedin: PropTypes.string,
            twitter: PropTypes.string,
            picture: PropTypes.string.isRequired,
          }).isRequired
        })
      )
    }).isRequired
  }).isRequired
}


export default function TeamMembers() {
  const data = useStaticQuery(
    graphql`
      query TeamMembersQuery {
        allTeamMembersJson {
          edges {
            node {
              name
              title
            }
          }
        }
      }
    `
  )

  return <TeamMembersTemplate data={data} />;
}
