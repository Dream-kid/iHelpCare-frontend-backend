@extends('template.index')
@section('styles')
    <style>
        .profile-card {
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #ffffff;
        }
        .info {
            gap: 5px;
            background-color: #ffffff;
            border-radius: 5px;
            white-space: normal;
        }
        .information{
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #fdf6f6;
        }
    </style>
@append
@section('content')
<section class="our-services pb-5">
    <div class="profile-card">
        <div class="row bg-light">
            <div class="col-md-12 p-3">
                <p class="ml-2 text-dark fs-2 text-center">Survey</p>
                <div id="surveySection" style="display: none;">
                    <div class="info mb-2" id="question1">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>1.Are you working parent?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <form class="fs-5">
                                    <input type="radio" id="html" name="fav_language" value="HTML">
                                    <label for="html">Yes</label><br>
                                    <input type="radio" id="css" name="fav_language" value="CSS">
                                    <label for="css">No</label><br>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question2" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>2.How frequently can you supervise your child during performance activities?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <form class="fs-5">
                                    <input type="radio" id="constantly" name="activities" value="constantly">
                                    <label for="constantly">I can constantly supervise my child during activities</label><br>
                                    <input type="radio" id="moderately" name="activities" value="moderately">
                                    <label for="moderately">I can moderately supervise my child during activities</label><br>
                                    <input type="radio" id="limitedly" name="activities" value="limitedly">
                                    <label for="limitedly">I can limitedly supervise my child during activities</label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question3" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>3.Are you and your child interested in celebrating special/occasional holidays?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <form class="fs-5">
                                    <input type="radio" id="yes" name="holidays" value="HTML">
                                    <label for="yes">Yes</label><br>
                                    <input type="radio" id="no" name="holidays" value="CSS">
                                    <label for="no">No</label><br>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question4" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>4.In which category of activity does your child show more interest? (Select multiple if needed)</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <span class="fw-italic">Pick as many as you want</span>
                                <form class="fs-5">
                                    <input type="checkbox" id="creative" name="fav_language1" value="HTML">
                                    <label for="creative">Creative (e.g., finger painting, clay modeling)</label><br>
                                    <input type="checkbox" id="css1" name="fav_language1" value="CSS">
                                    <label for="css1">Active (e.g., playing tag, jumping on a trampoline)</label><br>
                                    <input type="checkbox" id="javascript1" name="fav_language1" value="JavaScript">
                                    <label for="javascript1">Relaxation (e.g., storytime, watching clouds)</label><br>
                                    <input type="checkbox" id="educational" name="fav_language1" value="JavaScript">
                                    <label for="educational">Educational (e.g., puzzle solving, learning numbers)</label><br>
                                    <input type="checkbox" id="entertainment" name="fav_language1" value="JavaScript">
                                    <label for="entertainment">Entertainment (e.g., puppet show, magic show)</label><br>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question5" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>5.What is Lorem Ipsum?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <h5>&nbsp;Ans: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                                .</h5>
                                <p class="fs-5 mt-5">What did you know by reading this article?</p>
                                <form class="fs-5">
                                    <input type="radio" id="html2" name="fav_language2" value="HTML">
                                    <label for="html2">HTML</label><br>
                                    <input type="radio" id="css2" name="fav_language2" value="CSS">
                                    <label for="css2">CSS</label><br>
                                    <input type="radio" id="javascript2" name="fav_language2" value="JavaScript">
                                    <label for="javascript2">JavaScript</label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question6" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>6.Where does it come from?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <h5>&nbsp;Ans: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham..</h5>
                                    <p class="fs-5 mt-5">What did you know by reading this article?</p>
                                    <form class="fs-5">
                                        <input type="radio" id="html3" name="fav_language3" value="HTML">
                                        <label for="html3">HTML</label><br>
                                        <input type="radio" id="css3" name="fav_language3" value="CSS">
                                        <label for="css3">CSS</label><br>
                                        <input type="radio" id="javascript3" name="fav_language3" value="JavaScript">
                                        <label for="javascript3">JavaScript</label>
                                    </form>    
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question7" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>7.Why do we use it?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <h5>&nbsp;Ans: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)..</h5>
                                <p class="fs-5 mt-5">What did you know by reading this article?</p>
                                <form class="fs-5">
                                    <input type="radio" id="html4" name="fav_language4" value="HTML">
                                    <label for="html4">HTML</label><br>
                                    <input type="radio" id="css4" name="fav_language4" value="CSS">
                                    <label for="css4">CSS</label><br>
                                    <input type="radio" id="javascript4" name="fav_language4" value="JavaScript">
                                    <label for="javascript4">JavaScript</label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question8" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left"><h3>8.Where can I get some?</h3></div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 float-left">
                                <h5>&nbsp;Ans: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</h5>
                                <p class="fs-5 mt-5">What did you know by reading this article?</p>
                                <form class="fs-5">
                                    <input type="radio" id="html5" name="fav_language5" value="HTML">
                                    <label for="html5">HTML</label><br>
                                    <input type="radio" id="css5" name="fav_language5" value="CSS">
                                    <label for="css5">CSS</label><br>
                                    <input type="radio" id="javascript5" name="fav_language5" value="JavaScript">
                                    <label for="javascript5">JavaScript</label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="info mb-2" id="question9" style="display: none;">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-12 text-center">
                                <i class="fa fa-thumbs-up fa-4x"></i>
                                <h3 class="mt-4 fw-bold">Thanks!</h3>
                                <p class="fs-5 mt-6">We really appreciate your feedback!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="nextPrevButtons">
                        <div class="col-6 text-left">
                          <a href="javascript:;" id="prevButton" class="btn btn-primary text-decoration-none" style="display: none;">Previous</a>
                        </div>
                        <div class="col-6 text-right">
                          <a href="javascript:;" id="nextButton" class="btn btn-primary text-decoration-none">Next</a>
                        </div>
                    </div>
                    <div class="row" id="submitButton" style="display: none;">
                        <div class="col-12 text-center">
                        <a href="javascript:;" id="submit" class="btn btn-danger text-decoration-none m-3">Submit Survey</a><br>
                        <a href="javascript:;" id="retake" class="btn btn-info text-decoration-none m-3">Retake Survey</a>
                        </div>
                    </div>
                </div>
                <div class="container mt-4">
                    <div class="row" id="initialSurvey">
                        <div class="text-center text-dark">
                            <i class="fa fa-cloud fa-4x"></i>
                            <h3 class="mt-4 fw-bold">Your opinion is only 2 minutes.</h3>
                            <h5 class="mt-4">By answering a few questions, you help us understand your child's need and improve our service for an even better experience</h5>
                            <p class="fs-5 mt-6"></p>
                            <div class="text-center">
                                <a href="javascript:;" id="remindMe" class="btn btn-danger text-decoration-none m-3">Remind Me Later</a>
                                <a href="javascript:;" id="takeSurvey" class="btn btn-info text-decoration-none m-3">Take the Survey</a> <br>
                                <a href="{{route('community.learning')}}" id="skip" class="text-decoration-none m-3 fs-4 text-info">No thanks. I'm good</a>
                            </div>
                        </div>
                    </div>
                    
                </div>                
            </div>
        </div>
    </div>  
</section>
@endsection
@section('scripts')
<script>
    $(document).ready(function() {
        var currentQuestion = 1; // Track the current question number

        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const nextprevButton = document.getElementById('nextPrevButtons');
        const submitButton = document.getElementById('submitButton');
        const initialSurvey = document.getElementById('initialSurvey');
        const surveySection = document.getElementById('surveySection');
        $(document).on('click','#remindMe', function() {
            alert('Thanks for your response. We will remind you later!');
        });
        $(document).on('click','#takeSurvey', function() {
            currentQuestion = 1;
            initialSurvey.style.display = 'none';
            surveySection.style.display = 'block';
        });
        // Function to show or hide the buttons based on the current question
        function toggleButtons() {
            if (currentQuestion === 1) {
                prevButton.style.display = 'none';
            } else if (currentQuestion > 1) {
                prevButton.style.display = 'block';
            }

            // Assuming there are 8 questions (change the number according to your actual count)
            if (currentQuestion === 9) {
                nextButton.style.display = 'none';
                nextprevButton.style.display = 'none';
                submitButton.style.display = 'block';
            } else if (currentQuestion < 9) {
                nextButton.style.display = 'block';
            }
        }

        toggleButtons(); // Initially, toggle buttons based on currentQuestion

        document.getElementById('nextButton').addEventListener('click', function() {
            const currentQuestionDiv = document.getElementById(`question${currentQuestion}`);
            const nextQuestionDiv = document.getElementById(`question${currentQuestion + 1}`);

            if (currentQuestionDiv && nextQuestionDiv) {
                currentQuestionDiv.style.display = 'none';
                nextQuestionDiv.style.display = 'block';
                currentQuestion++;
                toggleButtons(); // Toggle buttons after changing the question
            } else {
                alert('No more questions available.');
            }
        });

        document.getElementById('prevButton').addEventListener('click', function() {
            const currentQuestionDiv = document.getElementById(`question${currentQuestion}`);
            const prevQuestionDiv = document.getElementById(`question${currentQuestion - 1}`);

            if (currentQuestionDiv && prevQuestionDiv) {
                currentQuestionDiv.style.display = 'none';
                prevQuestionDiv.style.display = 'block';
                currentQuestion--;
                toggleButtons(); // Toggle buttons after changing the question
            } else {
                alert('No previous questions available.');
            }
        });
        $(document).on('click','#submit', function() {
            alert('Thank you for your feedback!');
        });
        $(document).on('click','#retake', function() {
            location.reload();
        });
    });
</script>
@endsection