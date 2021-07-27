import Conversation, {
	ConversationProps,
} from 'Components/conversation/Conversation'
import SeeAnswersButton from 'Components/conversation/SeeAnswersButton'
import PageFeedback from 'Components/Feedback/PageFeedback'
import SearchButton from 'Components/SearchButton'
import * as Animate from 'Components/ui/animate'
import React from 'react'
import { Trans } from 'react-i18next'
import LinkToForm from './Feedback/LinkToForm'

type SimulationProps = {
	explanations?: React.ReactNode
	results?: React.ReactNode
	customEndMessages?: ConversationProps['customEndMessages']
	showPeriodSwitch?: boolean
	showLinkToForm?: boolean
	orderByCategories: Array<Object>
}

export default function Simulation({
	explanations,
	results,
	customEndMessages,
	customEnd,
	orderByCategories,
	showLinkToForm,
	showPeriodSwitch,
	noFeedback,
}: SimulationProps) {
	return (
		<>
			<SearchButton invisibleButton />
			<Animate.fromTop>
				{results}
				<Questions
					customEnd={customEnd}
					orderByCategories={orderByCategories}
					customEndMessages={customEndMessages}
				/>
				<br />
				{!noFeedback && (
					<>
						{showLinkToForm && <LinkToForm />}
						{!showLinkToForm && (
							<PageFeedback
								customMessage={
									<Trans i18nKey="feedback.simulator">
										Êtes-vous satisfait de ce simulateur ?
									</Trans>
								}
								customEventName="rate simulator"
							/>
						)}
					</>
				)}{' '}
				{explanations}
			</Animate.fromTop>
		</>
	)
}

function Questions({
	customEndMessages,
	customEnd,
	orderByCategories,
}: {
	customEndMessages?: ConversationProps['customEndMessages']
	orderByCategories: Array<Object>
}) {
	return (
		<>
			<div
				className="ui__ full-width"
				css={`
					@media (min-width: 800px) {
						margin-top: 0.6rem;
					}
				`}
			>
				<div className="ui__ container">
					<Conversation
						orderByCategories={orderByCategories}
						customEnd={customEnd}
						customEndMessages={customEndMessages}
					/>
				</div>
			</div>
		</>
	)
}
