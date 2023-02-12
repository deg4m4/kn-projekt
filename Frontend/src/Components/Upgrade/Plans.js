import React from 'react'
import ImageTemplates from '../../assets/images/img__upgrade.png'

const Plans = (props) => {
    
    return (
        <div>
                <div className="upgrade_plans">
                    <div className="upgrade__planWrapper">
                        {/* Plan left */}
                        <div className="upgrade_plan">
                            {/* Head */}
                            <div className="upgrade_plan-head" >
                                <span> Basic </span>
                                <p>Limited</p>
                            </div>
                            {/* Action */}
                            <div className="upgrade_plan-action" >
                                <div  onClick={()=>props.handlePlanClick()} className="upgrade_plan-action--btn">
                                    Get Started
                                </div>
                            </div>
                            {/* Price */}
                            <div className="upgrade_plan-action" >
                                <div className="upgrade_plan-action--price">
                                    <span>Free</span>
                                </div>
                            </div>
                            {/* Templates */}
                            <div className="upgrade_plan-action" >
                                <div className="upgrade__limitedTemplates">
                                    <span>
                                        LIMITED
                                    </span>
                                </div>
                            </div>
                            {/* Features */}

                            <div className="upgrade_plan-action" >
                                <div className="upgrade__features">
                                    <ul>
                                        <li>Limited number of templates</li>
                                        <li>Limited number of illustrations</li>

                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="upgrade__planWrapper">
                        {/* Plan Middle */}
                        <div className="upgrade_plan" >
                            {/* Head */}
                            <div className="upgrade_plan-head" >
                                <span> Plus </span>
                                <p>Power-up your designs</p>
                            </div>
                            {/* Action */}
                            <div className="upgrade_plan-action" >
                                <div onClick={()=>props.handlePlanClick(props.step == "Monthly" ? props.monthly : props.anually)} className="upgrade_plan-action--btn">
                                    Get Started
                                </div>
                            </div>
                            {/* Price */}
                            <div className="upgrade_plan-action" >
                                <div className="upgrade_plan-action--price">
                                    <span>${props.step == "Monthly"? props.monthly:props.anually} </span>
                                    <span className="upgrade_plan-action--duration">/{props.step == "Monthly"? "month":"year"} </span>
                                </div>
                            </div>
                            {/* Templates */}
                            <div className="upgrade_plan-action" >
                                <div className="upgrade__limitedTemplates">
                                    <span>
                                        UNLIMITED
                                    </span>
                                </div>
                            </div>
                            {/* Features */}

                            <div className="upgrade_plan-action" >
                                <div className="upgrade__features">
                                    <ul>
                                        <li>Access to premium templates</li>
                                        <li>Access to premium illustrations</li>
                                        <li>High export quality</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                       {/* Bottom section */}

                       <div className="upgrade__section2">
                    {/* Centered text */}
                    <div className="upgrade__centeredText">
                        <p>Simple, Transparent pricing.</p>
                    </div>
                    {/* Grid of 2 */}
                    <div className="upgrade__section2-grid2">
                        <div className="upgrade__section2-left">
                            <p>No need for complex desktop apps, it is all in your browser</p>
                            <div className="small__hr"></div>
                        </div>
                        <div className="upgrade__section2-right">
                            <p>Advanced Photo Editor with all the tools you need to create amazing designs</p>
                            <a href="#" className="upgrade__section2-button">
                                Try it now
                            </a>
                        </div>
                    </div>
                    {/* Centered text */}
                    <div className="upgrade__centeredText">
                        <img src={ImageTemplates} alt="Tempates" />
                    </div>

                </div>
        </div>
    )
}

export default Plans
